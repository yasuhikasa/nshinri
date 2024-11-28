import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '自己肯定感を高める';
export const description =
  '自己肯定感を高めるための実践的な方法について解説します。';
export const date = '2024-10-21';
export const author = 'Nくん';
export const content = `
  <h2>自己肯定感とは？</h2>
  <p>自己肯定感とは、自分自身を受け入れ、自分の価値を認める気持ちのことです。しかし、現代社会では多くの人が自己肯定感を低く感じ、自分を否定する思考にとらわれがちです。自己肯定感が低いと、失敗を過度に恐れたり、人と比較して自分に自信を持てなくなります。</p>

  <h2>なぜ自己肯定感が大切か？</h2>
  <p>自己肯定感が高まると、自分自身を大切にし、他者と比較することなく、ありのままの自分を受け入れることができるようになります。これにより、ストレスが軽減され、前向きな気持ちで挑戦する勇気が湧いてきます。</p>

  <h2>自己肯定感を高めるための方法</h2>
  <h3>1. 小さな成功体験を積み重ねる</h3>
  <p>自己肯定感を高めるためには、日々の小さな成功体験が大切です。大きな目標に一気に到達しようとせず、まずは小さなステップを踏み出しましょう。たとえば、朝早く起きる、少しずつ運動をするなど、日常生活の中で達成できることに集中します。</p>

  <h3>2. 自分を褒める</h3>
  <p>自己否定の癖を持っている人は、自分の良い点を見つけにくいものです。日々、自分の努力や成果を認め、自分自身を褒める習慣をつけましょう。たとえ小さなことでも、「よくやった」と自分に言い聞かせることが自己肯定感の向上につながります。</p>

  <h3>3. ネガティブな自己対話を改善する</h3>
  <p>「自分には無理だ」「どうせ失敗する」というネガティブな自己対話は、自己肯定感を低下させます。そうした否定的な思考が浮かんだときには、「自分ならできる」「今はまだ上手くいかないだけ」とポジティブな言葉に変えてみましょう。</p>

  <h3>4. 比較をやめる</h3>
  <p>他人と自分を比較することは、自己肯定感を下げる大きな原因です。SNSや周囲の成功と比べるのではなく、自分自身の成長にフォーカスしましょう。他者ではなく、過去の自分と比較して、自分の成長を実感することが大切です。</p>

  <h3>5. 健康的なライフスタイルを維持する</h3>
  <p>体調と心の健康は密接に関係しています。バランスの取れた食事、適度な運動、十分な睡眠を心がけることで、精神的な安定が保たれ、自己肯定感の向上につながります。</p>

  <h2>まとめ</h2>
  <p>自己肯定感を高めることは、時間がかかるプロセスですが、日々の小さな取り組みが大きな変化をもたらします。自分を大切にし、少しずつ前向きな気持ちを育てることで、より豊かな人生を送ることができるでしょう。</p>
  <p>まずは、今日から自分を褒める一歩を踏み出してみませんか？</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/self-esteem',
    },
    headline: title,
    description: description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://nshinri.net/aboutme',
    },
    publisher: {
      '@type': 'Organization',
      name: '心理カウンセリングとライフコーチング-Nくん',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nshinri.net/me.png',
        width: 300,
        height: 300,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://nshinri.net/me.png',
      width: 1200,
      height: 630,
    },
    articleBody: content,
  };

  return (
    <>
      {/* SEO 設定 */}
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: 'https://nshinri.net/posts/self-esteem',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: 'Nくんのロゴ',
            },
          ],
        }}
      />

      {/* JSON-LD 構造化データ */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* ヘッダー */}
      <Header />

      {/* パンくずリスト */}
      <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href="/">トップページ</Link>
          </li>
          <li>
            <Link href="/posts">記事一覧</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      {/* 記事コンテンツ */}
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{date}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

export default PostPage;
