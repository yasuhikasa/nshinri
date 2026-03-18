import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = 'こだわりの創作料理レシピ作成アプリ、販売開始しました！';
export const description =
  '日笠泰彰です。毎日の食卓にこだわりの創作料理を！新しいレシピアプリが登場しました。レシピ選びの楽しさと美味しさを提供します。詳細情報をご覧ください。';
export const date = '2025-01-13';
export const author = '日笠泰彰';
export const content = `
  <h2>こだわりの創作料理レシピアプリ</h2>
  <p>毎日の食卓に変化を！！「こだわりの創作料理レシピ」アプリが新登場しました。簡単にこだわりのレシピを選び、調理できます。料理の楽しさと美味しさが詰まったこのアプリで、新しいレシピ作りを始めましょう。</p>

  <h2>アプリの主な機能</h2>
  <ul>
    <li>最先端AIがあなたのこだわりに従ってレシピを作成！</li>
    <li>豊富なテンプレートで必ずあなたのこだわりが見つかります！</li>
    <li>シンプルな操作で料理を作成。手軽に創作レシピが楽しめます。</li>
    <li>ユーザーの気分や食材から最適なレシピを提案。</li>
    <li>レシピを保存して、自分だけのレシピ集を作成。</li>
    <li>毎日の食卓をより豊かにする、多彩なレシピを提供。</li>
  </ul>

  <h2>アプリを使うメリット</h2>
  <p>「こだわりの創作料理レシピ」アプリを使うことで、毎日の料理がもっと楽しく、こだわりのあるものに変わります。気分や食材に合わせたレシピが提案され、忙しい日でも手軽においしい料理を楽しめます。</p>

  <h2>アプリのダウンロード方法</h2>
  <p>このアプリは現在、以下のリンクからダウンロード可能です。</p>
  <ul>
    <li><a href="https://apps.apple.com/us/app/%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%AE%E5%89%B5%E4%BD%9C%E6%96%99%E7%90%86%E3%83%AC%E3%82%B7%E3%83%94-%E7%B0%A1%E5%8D%98%E3%81%AB%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%8C%E6%AF%8E%E6%97%A5%E3%81%AE%E9%A3%9F%E5%8D%93%E3%81%AB/id6739532255" target="_blank">App Store からダウンロード</a></li>
  </ul>

  <h2>最後に</h2>
  <p>「こだわりの創作料理レシピ」アプリで、毎日の食事をさらに楽しく、健康的に！新しいレシピ作りをぜひお試しください。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/recipe_release',
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
      url: 'https://nshinri.net/9.jpg',
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
          url: 'https://nshinri.net/recipe_release',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: '日笠泰彰によるNくんのロゴ',
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
