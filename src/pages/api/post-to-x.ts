import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// 型定義
type Theme = 'caregiving' | 'cooking' | 'counseling' | 'careerChange';

// 初期テーマ選択
const initialThemeSelection: Record<Theme, number> = {
  caregiving: 0,
  cooking: 0,
  counseling: 0,
  careerChange: 0,
};

// プロンプト（テーマ別、日本語）
const prompts: Record<Theme, string> = {
  caregiving: `介護に関する短い共感的で心に響く投稿を作成してください。以下を含めてください：
- 介護に関する共感を呼ぶエピソードや状況。
- 大変な気持ちを抱えている人への励ましの言葉。
- 負担を軽減するための実用的なアドバイス。
- トーンは温かく、サポートする内容にしてください。`,
  cooking: `料理に関する短い親しみやすく心に響く投稿を作成してください。以下を含めてください：
- 「夕食のアイデアが尽きた」といった共感を呼ぶ状況。
- 簡単で手早く作れるレシピの提案。
- 料理の楽しさや満足感を引き出す言葉。
- トーンは軽やかで楽しい内容にしてください。`,
  counseling: `心の健康に関する短い感動的で励ましの投稿を作成してください。以下を含めてください：
- 誰かが迷いや辛さを感じている状況。
- その人が理解されていると感じられる励ましの言葉。
- 少し気分が良くなるための小さな行動案。
- トーンは優しく、共感的な内容にしてください。`,
  careerChange: `40歳からの転職に関する短い励ましの投稿を作成してください。以下を含めてください：
- キャリアに行き詰まりを感じる状況。
- 「遅すぎることはない」という勇気を与える言葉。
- 40歳以降に成功した人の具体例。
- トーンは明るく、希望を持たせる内容にしてください。`,
};

// テーマごとの画像とリンク
const contentLibrary: Record<Theme, { text: string; link: string }> = {
  caregiving: {
    text: '自宅で簡単、在宅介護記録スマホアプリ👇',
    link: 'https://nshinri.net/kaigokiroku',
  },
  cooking: {
    text: 'AIで作るこだわりのレシピアプリ👇',
    link: 'https://nshinri.net/newrecipe',
  },
  counseling: {
    text: 'カウンセリングはこちら👇',
    link: 'https://nshinri.net/counseling',
  },
  careerChange: {
    text: '40代からの未経験転職体験談はこちら👇',
    link: 'https://www.amazon.co.jp/dp/B0DNXPFD37',
  },
};

// 画像ライブラリ
const imageLibrary: Record<Theme, string> = {
  caregiving: 'https://nshinri.net/10.png',
  cooking: 'https://nshinri.net/7.png',
  counseling: 'https://nshinri.net/4.jpg',
  careerChange: 'https://nshinri.net/5.jpeg',
};

// テーマ選択ロジック
const getNextTheme = (selectionData: Record<Theme, number>): Theme => {
  const minCount = Math.min(...Object.values(selectionData));
  const leastSelectedThemes = (Object.keys(selectionData) as Theme[]).filter(
    (theme) => selectionData[theme] === minCount
  );
  return leastSelectedThemes[
    Math.floor(Math.random() * leastSelectedThemes.length)
  ];
};

// GitHub Secrets APIのヘルパー関数
const updateGitHubSecret = async (
  updatedSelection: Record<Theme, number>
): Promise<void> => {
  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!githubToken || !repo) {
    throw new Error('Missing GitHub environment variables');
  }

  const [owner, repoName] = repo.split('/');
  const secretName = 'THEME_SELECTION';
  const url = `https://api.github.com/repos/${owner}/${repoName}/actions/secrets/${secretName}`;
  const updatedData = Buffer.from(JSON.stringify(updatedSelection)).toString(
    'base64'
  );

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      encrypted_value: updatedData,
      key_id: process.env.GITHUB_KEY_ID,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update GitHub secret: ${errorText}`);
  }
};

// APIエンドポイント
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const themeSelection = JSON.parse(
      process.env.THEME_SELECTION || JSON.stringify(initialThemeSelection)
    );

    const selectedTheme = getNextTheme(themeSelection);
    themeSelection[selectedTheme]++;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompts[selectedTheme] }],
    });

    const articleText = response.choices[0]?.message?.content?.trim() || '';

    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    });

    const mediaId = await twitterClient.v1.uploadMedia(
      imageLibrary[selectedTheme]
    );
    const tweetText = `
${articleText}\n\n
${contentLibrary[selectedTheme].text}\n
${contentLibrary[selectedTheme].link}
    `;
    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });

    await updateGitHubSecret(themeSelection);

    res.status(200).json({ message: 'Successfully posted to X!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export default handler;
