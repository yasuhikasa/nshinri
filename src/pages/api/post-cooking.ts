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

const cookingPrompt = `料理を楽しく感じさせる短い投稿を作成してください。以下を含めてください：
- 夕食メニューに迷っている人への共感を呼ぶ一言。
- 「簡単・時短・美味しい」をテーマにしたレシピの提案。
- 自炊が生活に彩りを与えるという前向きなメッセージ。
- 必ず140文字以内で、明るく親しみやすいトーンにしてください。`;

const cookingContent = {
  text: 'AIで作るこだわりのレシピアプリ👇',
  link: 'https://nshinri.net/newrecipe',
  image: 'https://nshinri.net/7.png',
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
      messages: [{ role: 'user', content: cookingPrompt }],
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
    const tempFilePath = path.join(tempDir, 'cooking-image.png');
    console.log('Downloading image...');
    await downloadImage(cookingContent.image, tempFilePath);

    console.log('Uploading media...');
    const mediaId = await twitterClient.v1.uploadMedia(tempFilePath);
    console.log('Uploaded media ID:', mediaId);

    // ツイートテキストを準備
    const tweetText = `
${articleText}\n\n
${cookingContent.text}\n
${cookingContent.link}
    `.trim();

    console.log('Posting tweet...');
    await twitterClient.v2.tweet({
      text: tweetText,
      media: { media_ids: [mediaId] },
    });
    console.log('Successfully posted tweet!');

    // 一時ファイルを削除
    fs.unlinkSync(tempFilePath);

    res
      .status(200)
      .json({ message: 'Successfully posted cooking content to X!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
