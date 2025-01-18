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
  if (!fs.existsSync(postsFilePath)) {
    console.error(`JSONファイルが見つかりません: ${postsFilePath}`);
    return [];
  }

  try {
    const data = fs.readFileSync(postsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`JSONファイルの読み込みに失敗しました: ${error.message}`);
    }
    return [];
  }
}
// インターバルを挿入するための sleep 関数
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    console.log('APIリクエストを受信しました。');
    const posts = getPosts();

    if (posts.length === 0) {
      console.error('投稿データが空です。投稿を終了します。');
      return res.status(400).json({ error: '投稿する記事がありません' });
    }

    // 全ての記事を順番に投稿
    for (const post of posts) {
      const message = `${post.content}\n\n${post.link}\n${post.hashtags}`;
      console.log(`投稿メッセージを準備中: ${message}`);

      try {
        // ツイートを投稿
        const tweet = await twitterClient.v2.tweet(message);
        console.log('ツイート成功:', tweet);
      } catch (twitterError) {
        console.error('ツイート中にエラーが発生しました:', twitterError);
      }

      // 5秒間のインターバル
      console.log('次の投稿まで5秒待機します...');
      await sleep(1000); // 1秒待機
    }

    return res
      .status(200)
      .json({ success: true, message: '全ての記事を投稿しました。' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('API全体でエラーが発生しました:', error.message);
      return res
        .status(500)
        .json({ error: '投稿に失敗しました', details: error.message });
    }
  }
}
