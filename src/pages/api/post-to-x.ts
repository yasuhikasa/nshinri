import { NextApiRequest, NextApiResponse } from 'next';
import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';

// 認証情報
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY || '',
  appSecret: process.env.TWITTER_APP_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
  accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
});

// JSONファイルのパス
const postsFilePath = path.join(process.cwd(), 'src/data/posts.json');

interface Post {
  title: string;
  content: string;
  link: string;
  hashtags: string;
}
// JSONデータを読み込む関数
function getPosts(): Post[] {
  if (fs.existsSync(postsFilePath)) {
    const data = fs.readFileSync(postsFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const posts = getPosts();

    if (posts.length === 0) {
      return res.status(400).json({ error: '投稿する記事がありません' });
    }

    // 全ての記事を順番に投稿
    for (const post of posts) {
      const message = `${post.content}\n\n${post.link}\n${post.hashtags}`;

      // ツイートを投稿
      const tweet = await twitterClient.v2.tweet(message);
      console.log('ツイートしました:', tweet);
    }

    return res
      .status(200)
      .json({ success: true, message: '全ての記事を投稿しました。' });
  } catch (error) {
    console.error('エラーが発生しました:', error);
    return res.status(500).json({ error: '投稿に失敗しました' });
  }
}
