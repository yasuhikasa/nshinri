import { NextApiRequest, NextApiResponse } from 'next';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tweetText, mediaUrl } = req.body;

  if (!tweetText || !mediaUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('Initializing Twitter API client...');
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    });

    console.log('Uploading media...');
    const mediaId = await twitterClient.v1.uploadMedia(mediaUrl);
    console.log('Uploaded media ID:', mediaId);

    // ツイートを投稿
    const tweet = await twitterClient.v1.tweet(tweetText, {
      media_ids: [mediaId],
    });
    console.log('Successfully posted tweet:', tweet);

    res.status(200).json({ message: 'Successfully posted tweet!', tweet });
  } catch (error) {
    console.error('Error occurred while posting to Twitter:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
