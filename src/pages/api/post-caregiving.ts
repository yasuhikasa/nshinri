import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config();

// 一時的に画像を保存するディレクトリ
const tempDir = '/tmp';

// 画像をダウンロードしてローカルに保存する関数
const downloadImage = async (url: string, filepath: string) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(filepath, response.data);
};

const caregivingPrompt = `介護に関する短い共感的で心に響く投稿を作成してください。以下を考慮してください：
- 介護に関する共感を呼ぶエピソードや状況。
- 大変な気持ちを抱えている人への励ましの言葉。
- 負担を軽減するための実用的なアドバイス。
- トーンは温かく、サポートする内容にしてください。
- 140文字以内に収めてください。`;

const caregivingContent = {
  text: '自宅で簡単、在宅介護記録スマホアプリ👇',
  link: 'https://nshinri.net/kaigokiroku',
  image: 'https://nshinri.net/10.png',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting OpenAI API request...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: caregivingPrompt }],
      max_tokens: 140,
      temperature: 0.7,
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';
    console.log('Generated article text:', articleText);

    console.log('Initializing Twitter API client...');
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY || '',
      appSecret: process.env.TWITTER_APP_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    });

    // 画像を一時ディレクトリに保存
    const tempFilePath = path.join(tempDir, 'caregiving-image.png');
    console.log('Downloading image...');
    await downloadImage(caregivingContent.image, tempFilePath);

    console.log('Uploading media...');
    const mediaId = await twitterClient.v1.uploadMedia(tempFilePath);
    console.log('Uploaded media ID:', mediaId);

    // ツイートテキストを準備
    const tweetText = `
${articleText}\n\n
${caregivingContent.text}\n
${caregivingContent.link}
    `.trim();

    console.log('Posting tweet...');
    await twitterClient.v1.tweet(tweetText, { media_ids: [mediaId] });
    console.log('Successfully posted tweet!');

    // 一時ファイルを削除
    fs.unlinkSync(tempFilePath);

    res
      .status(200)
      .json({ message: 'Successfully posted caregiving content to X!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
