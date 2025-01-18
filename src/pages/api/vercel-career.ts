import { NextApiRequest, NextApiResponse } from 'next';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config();

// 一時的に画像を保存するディレクトリを指定
const tempDir = '/tmp';

const downloadImage = async (url: string, filepath: string) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(filepath, response.data);
};

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
      appKey: process.env.TWITTER_APP_KEY || '',
      appSecret: process.env.TWITTER_APP_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    });

    console.log('Downloading media...');
    const tempFilePath = path.join(tempDir, 'media-image.jpeg');
    await downloadImage(mediaUrl, tempFilePath);

    console.log('Uploading media...');
    const mediaId = await twitterClient.v1.uploadMedia(tempFilePath);
    console.log('Uploaded media ID:', mediaId);

    console.log('Posting tweet...');
    const tweet = await twitterClient.v2.tweet({
      text: tweetText,
      media: { media_ids: [mediaId] },
    });
    console.log('Successfully posted tweet:', tweet);

    // 一時ファイルを削除
    fs.unlinkSync(tempFilePath);

    res.status(200).json({ message: 'Successfully posted tweet!', tweet });
  } catch (error) {
    console.error('Error occurred while posting to Twitter:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
