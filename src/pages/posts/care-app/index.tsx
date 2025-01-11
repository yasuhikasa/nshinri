import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '在宅用の介護記録アプリを販売開始しました';
export const description =
  '在宅介護を支える新しいスマホアプリをリリースしました。簡単操作で日々の介護記録を管理し、共有も可能に。機能詳細や導入方法をご紹介します。';
export const date = '2025-01-11';
export const author = 'Nくん';
export const content = `
  <h2>在宅介護を支える新しいスマホアプリ</h2>
  <p>在宅での介護を少しでも楽にするために、介護記録を簡単に管理できるスマホアプリを開発しました。このアプリは、介護福祉士であり現役ITエンジニアの私が、自らの経験をもとに設計しました。</p>

  <h2>アプリの主な機能</h2>
  <ul>
    <li>日々の介護記録（食事、水分摂取、排泄、運動など）を簡単に入力可能</li>
    <li>記録データを家族やヘルパーとPDF出力にて共有</li>
    <li>介護に役立つ介護情報更新中。介護に不慣れでも介護に詳しくなれます。</li>
    <li>簡単で直感的な操作が可能なUI設計</li>
  </ul>

  <h2>アプリを使うメリット</h2>
  <p>このアプリを使うことで、介護者の負担を軽減し、介護を受ける方の健康状態を適切に把握することができます。また、データ出力を利用して家族やヘルパーと記録を共有することで、よりスムーズな連携が可能になります。</p>

  <h2>アプリのダウンロード方法</h2>
  <p>このアプリは現在、以下のリンクからダウンロード可能です。</p>
  <ul>
    <li><a href="https://apps.apple.com/jp/app/%E8%87%AA%E5%AE%85%E3%81%A7%E7%B0%A1%E5%8D%98-%E5%9C%A8%E5%AE%85%E4%BB%8B%E8%AD%B7%E3%83%BC%E4%BB%8B%E8%AD%B7%E8%A8%98%E9%8C%B2%E3%82%A2%E3%83%97%E3%83%AA/id6738299675" target="_blank">App Store からダウンロード</a></li>
  </ul>

  <h2>最後に</h2>
  <p>在宅介護をサポートするために、このアプリが少しでもお役に立てれば幸いです。今後も機能の追加や改善を続けていきますので、ぜひお試しください。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/care-app',
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
          url: 'https://nshinri.net/posts/care-app',
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
