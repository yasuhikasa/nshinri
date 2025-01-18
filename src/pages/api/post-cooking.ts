import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const cookingPrompt = `料理に関する短い親しみやすく心に響く投稿を作成してください。以下を含めてください：
- 「夕食のアイデアが尽きた」といった共感を呼ぶ状況。
- 簡単で手早く作れるレシピの提案。
- 料理の楽しさや満足感を引き出す言葉。
- トーンは軽やかで楽しい内容にしてください。`;

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
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: cookingPrompt }],
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';

    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    });

    const mediaId = await twitterClient.v1.uploadMedia(cookingContent.image);
    const tweetText = `
${articleText}\n\n
${cookingContent.text}\n
${cookingContent.link}
    `;

    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });

    res
      .status(200)
      .json({ message: 'Successfully posted cooking content to X!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
