import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const caregivingPrompt = `介護に関する短い共感的で心に響く投稿を作成してください。以下を含めてください：
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
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: caregivingPrompt }],
      max_tokens: 140, // 必要に応じて調整（Xのツイート用なら280文字以内）
      temperature: 0.7,
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';

    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY || '',
      appSecret: process.env.TWITTER_APP_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    });

    const mediaId = await twitterClient.v1.uploadMedia(caregivingContent.image);
    const tweetText = `
${articleText}\n\n
${caregivingContent.text}\n
${caregivingContent.link}
    `;

    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });

    res
      .status(200)
      .json({ message: 'Successfully posted caregiving content to X!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
