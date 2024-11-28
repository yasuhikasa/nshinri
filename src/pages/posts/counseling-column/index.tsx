import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = 'カウンセリングの重要さ';
export const description =
  'カウンセリングが孤独感や生きにくさを解消し、社会復帰や自己肯定感の回復をサポートする重要性について説明します。';
export const date = '2024-10-18';
export const author = 'Nくん';
export const content = `
  <h2>孤独な悩みと「生きにくさ」</h2>
  <p>人生には、誰にも話せない悩みや、自分ではどうにも解決が難しい「生きにくさ」を感じる瞬間があります。家族や友人に相談しても、うわべだけの励ましで終わってしまい、深く共感してもらえないこともあるかもしれません。その結果、孤独感や無力感に押しつぶされてしまうことが増えていきます。</p>
  <p>「どうしてこんなに苦しいんだろう？」「どうして自分の人生はこんななんだろう」「どうして自分だけ・・・」と思うことがあるかもしれません。</p>
  <p>「誰も自分の気持ちを分かってくれない」「どうしてこんなに動けないんだろう？」と感じることもあるかもしれません。特に、うつや抑うつ状態にあると、次の一歩が踏み出せず、その悩みはますます重くのしかかってきます。しかし、こういった状況でこそカウンセリングが大きな力になります。</p>

  <h2>カウンセリングとは？</h2>
  <p>カウンセリングは、専門のカウンセラーと対話を通じて、感情や考えを整理し、心の負担を軽くする場です。カウンセラーはあなたを判断することなく、共感的に耳を傾けてくれます。あなたの「生きにくさ」を言葉にすることで、少しずつ問題が整理され、どう一歩を踏み出すかが見えてくるでしょう。</p>
  <p>言葉にすることで、自分の中で渦巻いていた感情が整理され、動き出す力を少しずつ取り戻していくことができます。客観的に自分の状況を見ることができるようになり、新しい視点や希望が見つかるかもしれません。</p>

  <h2>カウンセリングで得られるサポート</h2>
  <p>カウンセリングを受けることで、まず感じられるのは孤独感からの解放です。自分一人で抱え込んでいた悩みを、安心して話せる相手がいるというだけで、心の重荷が軽くなることがあります。そして、それだけではなく、次のステップを一緒に考え、具体的な行動に結びつけるためのサポートを受けることができます。</p>
  <p>カウンセリングは、あなたの自己肯定感の回復にもつながります。自分を否定することから解放され、新たな視点やアプローチで人生に向き合う勇気を取り戻すことができるのです。</p>

  <h2>「一歩先へ」進むためのカウンセリング</h2>
  <p>カウンセリングは、ただ悩みを話すだけの場ではありません。「何から始めればいいのかわからない」「もう一歩がどうしても踏み出せない」という状態から、具体的な一歩を共に探り、無理のないペースで進めていくサポートを受けることができます。あなたのペースに合わせて、新しいステップを踏み出すための道筋を共に描いていきます。</p>
  <p>特に社会復帰や人間関係の再構築など、未来に向けてどう行動すべきか悩んでいる方には、カウンセリングが大きな手助けとなるでしょう。「どうせ自分なんて」と感じていても、少しずつ自分を取り戻し、次のステージに進むことができます。</p>

  <h2>カウンセリングを始めるために</h2>
  <p>カウンセリングは、特別な人だけのものではありません。誰でも、心に「生きにくさ」や悩みを感じたときに、カウンセリングを受けることができます。初めてのカウンセリングでは不安や緊張を感じるかもしれませんが、カウンセラーはあなたの不安を理解し、優しくサポートします。</p>
  <p>もし今、あなたが「一歩先に進めない」と感じているのなら、一度カウンセリングを試してみてください。カウンセリングが、あなたにとって次の一歩を踏み出す大きな助けとなり、未来への新しい扉を開くきっかけになるでしょう。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/counseling-column',
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
          url: 'https://nshinri.net/posts/counseling-column',
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
