import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '心の居場所の大切さ';
export const description =
  '誰もが感じる孤独や生きにくさ。心の居場所を見つけることで、自分を取り戻し、前向きな変化を促す力を見つけていきましょう。';
export const date = '2024-11-06';
export const author = 'Nくん';
export const content = `
  <h2>心の居場所がもたらす安心感</h2>
  <p>私たちが心地よく感じ、素直に自分をさらけ出せる「心の居場所」は、日々の生活の中でかけがえのない存在です。仕事や人間関係、家庭の悩みなど、現代社会には多くのストレス要因があり、それらに押しつぶされそうになる時、心の居場所があることでどれほど救われるかは計り知れません。</p>
  <p>心の居場所とは、必ずしも物理的な空間ではなく、話を聞いてくれる人や自分を理解してくれる存在、その存在だけで安心できる場所のことを指します。そこには批判や評価がなく、ただそのままの自分でいられる場所です。</p>

  <h2>心の居場所が持つ力</h2>
  <p>心の居場所を持つことは、自己肯定感の向上にも大きく影響します。自分をありのまま受け入れてくれる存在があると、「自分はここにいてもいいんだ」と思えるようになり、不安や孤独感が和らぎます。この「居場所」があることで、次第に心が安定し、心の余裕が生まれ、新しいことに挑戦したり、困難に立ち向かったりする力が湧いてきます。</p>
  <p>例えば、心の居場所があることで、困難な状況に直面しても「ここに帰れる」という安心感が心の支えとなり、日々のストレスから解放される時間が生まれます。</p>

  <h2>心の居場所を見つけるには</h2>
  <p>心の居場所を見つけるには、まず自分自身の「感じ方」や「本音」を素直に受け入れることが大切です。日々の忙しさの中で自分の気持ちに蓋をしてしまうと、本当に求めているものが見えなくなってしまいます。小さなことでも、「自分が心地よいと感じるもの」「安心できる存在」を見つけていくことで、少しずつ自分の心が落ち着ける居場所が広がっていくでしょう。</p>
  <p>もし心の居場所が見つけにくいと感じる場合、カウンセリングがその助けになることもあります。カウンセラーとの対話を通じて、自分の心の声に耳を傾け、自分の心地よい場所を見つけるサポートを受けることができます。</p>

  <h2>誰にでも「居場所」が必要</h2>
  <p>誰にでも、心の居場所が必要です。心の居場所を持つことで、自分を取り戻し、前向きに歩んでいく力を得ることができます。そして、そんな居場所があることで、新たな気づきや安心感が生まれ、心が軽くなることを実感できるはずです。</p>
  <p>日々の生活で立ち止まりそうになる時、自分の居場所を大切にし、その場所が持つ力を信じてみてください。きっと、心の重荷が少しずつ解放され、より自由に、自分らしく生きていく一歩を踏み出す力になるでしょう。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/heart-place',
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
          url: 'https://nshinri.net/posts/heart-place',
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
