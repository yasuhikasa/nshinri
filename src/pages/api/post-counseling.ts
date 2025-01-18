import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting OpenAI API request...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: counselingPrompt }],
      max_tokens: 140,
      temperature: 0.7,
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';
    console.log('Generated article text:', articleText);

    // Vercelエンドポイントを呼び出す
    const vercelEndpoint = 'https://nshinri.net/api/vercel-career';

    const tweetText = `
${articleText}\n\n
${counselingContent.text}\n
${counselingContent.link}
    `.trim();

    const responseVercel = await fetch(vercelEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweetText,
        mediaUrl: counselingContent.image,
      }),
    });

    if (!responseVercel.ok) {
      const errorResponse = await responseVercel.json();
      throw new Error(`Vercel API error: ${errorResponse.error}`);
    }

    const result = await responseVercel.json();
    console.log('Successfully posted via Vercel:', result);

    res
      .status(200)
      .json({ message: 'Successfully handled the entire process!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
