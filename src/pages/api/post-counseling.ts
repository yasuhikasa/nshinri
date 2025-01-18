import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const counselingPrompt = `心の健康に関する短い感動的で励ましの投稿を作成してください。以下を考慮してください：
- 誰かが迷いや辛さを感じている状況。
- その人が理解されていると感じられる励ましの言葉。
- 少し気分が良くなるための小さな行動案。
- トーンは優しく、共感的な内容にしてください。
- 140文字以内に収めてください。`;

const counselingContent = {
  text: 'カウンセリングはこちら👇',
  link: 'https://nshinri.net/counseling',
  image: 'https://nshinri.net/4.jpg',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: counselingPrompt }],
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

    const mediaId = await twitterClient.v1.uploadMedia(counselingContent.image);
    const tweetText = `
${articleText}\n\n
${counselingContent.text}\n
${counselingContent.link}
    `;

    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });

    res
      .status(200)
      .json({ message: 'Successfully posted counseling content to X!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
