import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const cookingPrompt = `料理を楽しく感じさせる短い投稿を作成してください。以下を含めてください：
- 夕食メニューに迷っている人への共感を呼ぶ一言。
- 「簡単・時短・美味しい」をテーマにしたレシピの提案。
- 自炊が生活に彩りを与えるという前向きなメッセージ。
- 必ず140文字以内で、明るく親しみやすいトーンにしてください。`;

const cookingContent = {
  text: '👇AIで作るこだわりのレシピアプリ',
  link: 'https://apps.apple.com/jp/app/%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%AE%E5%89%B5%E4%BD%9C%E6%96%99%E7%90%86%E3%83%AC%E3%82%B7%E3%83%94-%E7%B0%A1%E5%8D%98%E3%81%AB%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%8C%E6%AF%8E%E6%97%A5%E3%81%AE%E9%A3%9F%E5%8D%93%E3%81%AB/id6739532255',
  // image: 'https://nshinri.net/7.png',
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

    // Vercelエンドポイントを呼び出す
    const vercelEndpoint = 'https://nshinri.net/api/vercel-career';

    const tweetText = `
${articleText}\n\n
${cookingContent.text}\n
${cookingContent.link}
    `.trim();

    const responseVercel = await fetch(vercelEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweetText,
        // mediaUrl: cookingContent.image,
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
