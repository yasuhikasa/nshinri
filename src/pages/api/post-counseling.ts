import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

dotenv.config();

const counselingPrompt = `心の健康に関する短い感動的で励ましの投稿を作成してください。以下を考慮してください：
- 誰かが迷いや辛さを感じている状況。
- その人が理解されていると感じられる励ましの言葉。
- 少し気分が良くなるための小さな行動案。
- トーンは優しく、共感的な内容にしてください。
- 140文字以内に収めてください。`;

const counselingContent = {
  text: '介護の悩み、心理カウンセリング、IT・未経験転職の相談はこちら👇',
  link: 'https://nshinri.net/counseling',
  image: 'https://nshinri.net/4.jpg',
};

// 画像を一時保存する関数
const downloadImage = async (url: string, filepath: string): Promise<void> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}: ${response.statusText}`);
  }
  const buffer = await response.buffer();
  fs.writeFileSync(filepath, buffer);
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
      max_tokens: 140,
      temperature: 0.7,
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';

    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY || '',
      appSecret: process.env.TWITTER_APP_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    });

    // 画像を一時保存
    const tempImagePath = path.join('/tmp', 'counseling-image.jpg');
    await downloadImage(counselingContent.image, tempImagePath);

    // 画像をアップロード
    const mediaId = await twitterClient.v1.uploadMedia(tempImagePath);
    const tweetText = `
${articleText}\n\n
${counselingContent.text}\n
${counselingContent.link}
    `.trim();

    // ツイートを投稿
    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });

    // 一時ファイルを削除
    fs.unlinkSync(tempImagePath);

    res
      .status(200)
      .json({ message: 'Successfully posted counseling content to X!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
