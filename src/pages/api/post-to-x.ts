import { OpenAI } from 'openai';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

// 型定義
type Theme = 'caregiving' | 'cooking' | 'counseling' | 'careerChange';

interface Content {
  text: string;
  link: string;
}

interface ImageLibrary {
  [key: string]: string;
}

interface PromptLibrary {
  [key: string]: string;
}

// 初期化
const initialThemeSelection: Record<Theme, number> = {
  caregiving: 0,
  cooking: 0,
  counseling: 0,
  careerChange: 0,
};

// テーマ選択回数を環境変数から取得（なければ初期化）
const themeSelection: Record<Theme, number> = JSON.parse(
  process.env.THEME_SELECTION || JSON.stringify(initialThemeSelection)
);

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

// テーマの選択
const selectedTheme: Theme = getNextTheme(themeSelection);

// 選択されたテーマのカウントを更新
themeSelection[selectedTheme]++;

// プロンプト（テーマ別、日本語）
const prompts: PromptLibrary = {
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
const contentLibrary: Record<Theme, Content> = {
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

const imageLibrary: ImageLibrary = {
  caregiving: 'https://nshinri.net/10.png',
  cooking: 'https://nshinri.net/7.png',
  counseling: 'https://nshinri.net/4.jpg',
  careerChange: 'https://nshinri.net/5.jpeg',
};

// OpenAIで記事生成
const generatePost = async (theme: Theme): Promise<string> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompts[theme] }],
  });

  return response.choices[0]?.message?.content?.trim() || '';
};

// 投稿内容を生成してTwitterに送信
(async () => {
  try {
    const articleText = await generatePost(selectedTheme);

    const tweetText = `
${articleText}\n\n
${contentLibrary[selectedTheme].text}\n
${contentLibrary[selectedTheme].link}
    `;

    const twitterClient = new TwitterApi({
      appKey: process.env.X_API_KEY || '',
      appSecret: process.env.X_API_SECRET || '',
      accessToken: process.env.X_ACCESS_TOKEN || '',
      accessSecret: process.env.X_ACCESS_TOKEN_SECRET || '',
    });

    // 画像を含む投稿
    const mediaId = await twitterClient.v1.uploadMedia(
      imageLibrary[selectedTheme]
    );
    await twitterClient.v1.tweet(tweetText, { media_ids: mediaId });

    console.log('Successfully posted to X!');

    // 環境変数に選択回数を保存（GitHub Actionsの環境変数を更新）
    console.log(
      '::set-output name=theme_selection::' + JSON.stringify(themeSelection)
    );
  } catch (error) {
    console.error('Error posting to X:', error);
  }
})();
