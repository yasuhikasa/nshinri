import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

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

    // Vercelエンドポイントを呼び出す
    const vercelEndpoint = 'https://nshinri.net/api/vercel-career';

    const tweetText = `
${articleText}\n\n
${caregivingContent.text}\n
${caregivingContent.link}
    `.trim();

    const responseVercel = await fetch(vercelEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweetText,
        mediaUrl: caregivingContent.image,
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
