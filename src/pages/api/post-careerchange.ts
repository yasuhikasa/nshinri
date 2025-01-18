import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const careerChangePrompt = `40歳からの転職に関する短い励ましの投稿を作成してください。以下を含めてください：
- キャリアに行き詰まりを感じる状況。
- 「遅すぎることはない」という勇気を与える言葉。
- 40歳以降に成功した人の具体例。
- トーンは明るく、希望を持たせる内容にしてください。`;

const careerChangeContent = {
  text: '40代からの未経験転職体験談はこちら👇',
  link: 'https://www.amazon.co.jp/dp/B0DNXPFD37',
  image: 'https://nshinri.net/5.jpeg',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Invalid request method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting OpenAI API request...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: careerChangePrompt }],
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';
    console.log('Generated article text:', articleText);

    console.log('Initializing Twitter API client...');
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    });

    console.log('Uploading media...');
    const mediaId = await twitterClient.v1.uploadMedia(
      careerChangeContent.image
    );
    console.log('Uploaded media ID:', mediaId);

    const tweetText = `
${articleText}\n\n
${careerChangeContent.text}\n
${careerChangeContent.link}
    `;
    console.log('Prepared tweet text:', tweetText);
    console.log('Tweet text length:', tweetText.length);

    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });
    console.log('Successfully posted tweet!');

    res
      .status(200)
      .json({ message: 'Successfully posted career change content to X!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
