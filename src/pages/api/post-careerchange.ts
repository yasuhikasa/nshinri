import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const careerChangePrompt = `40歳からの転職に関する短い励ましの投稿を作成してください。以下を考慮してください：
- キャリアに行き詰まりを感じる状況。
- 「遅すぎることはない」という勇気を与える言葉。
- 40歳以降に成功した人の具体例。
- トーンは明るく、希望を持たせる内容にしてください。
- 140文字以内に収めてください。`;

const careerChangeContent = {
  text: '40代からの未経験転職体験談はこちら👇',
  link: 'https://www.amazon.co.jp/dp/B0DNXPFD37',
  image: 'https://nshinri.net/5.jpeg',
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
      messages: [{ role: 'user', content: careerChangePrompt }],
      max_tokens: 140, // 必要に応じて調整（Xのツイート用なら280文字以内）
      temperature: 0.7,
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';
    console.log('Generated article text:', articleText);

    // Vercelの投稿エンドポイントを呼び出す
    const vercelEndpoint = 'https://nshinri.net/api/vercel-career';

    const tweetText = `
${articleText}\n\n
${careerChangeContent.text}\n
${careerChangeContent.link}
    `.trim();

    const responseVercel = await fetch(vercelEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweetText,
        mediaUrl: careerChangeContent.image,
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
