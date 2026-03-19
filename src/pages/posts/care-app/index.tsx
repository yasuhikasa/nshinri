import Header from '../../../components/Header';
import AuthorProfile from '../../../components/AuthorProfile';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '在宅用の介護記録アプリを販売開始しました';
export const description =
  '日笠泰彰が開発した在宅介護記録アプリをご紹介します。簡単操作で介護記録を管理し、家族や介護関係者との情報共有をスムーズにする機能と活用メリットを解説します。';
export const date = '2025-01-11';
export const author = '日笠泰彰';

const articleBody =
  '日笠泰彰が開発した在宅介護記録アプリは、食事・水分摂取・排泄・運動などの日々の記録を簡単に入力でき、' +
  '家族や介護関係者との情報共有を円滑にすることを目的としています。' +
  '介護福祉士としての経験と現役ITエンジニアとしての知見をもとに、在宅介護の現場で使いやすい設計を実現しています。';

const PostPage = () => {
  const url = 'https://nshinri.net/posts/care-app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://nshinri.net/aboutme',
    },
    publisher: { '@type': 'Organization', name: '日笠泰彰' },
    articleBody,
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [{ url: 'https://nshinri.net/me.png' }],
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main className={`${styles.container} ${styles.postMain}`}>
        <nav className={`${styles.breadcrumb} ${styles.breadcrumbNav}`}>
          <Link href="/">トップ</Link> ＞ <Link href="/posts">記事一覧</Link> ＞
          現在の記事
        </nav>

        <article>
          <header className={styles.articleHeader}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.metaRow}>
              <span>📅 {date}</span>
              <span>👤 著者: {author}</span>
            </div>
          </header>

          <div className={styles.content}>
            <h2>在宅介護を支える新しいスマホアプリ</h2>
            <p>
              在宅での介護を少しでも楽にするために、介護記録を簡単に管理できるスマホアプリを開発しました。
              このアプリは、介護福祉士としての経験がある現役ITエンジニアの日笠泰彰が、
              現場で必要とされる使いやすさを重視して設計しています。
            </p>

            <h2>アプリの主な機能</h2>
            <ul>
              <li>
                日々の介護記録（食事、水分摂取、排泄、運動など）を簡単に入力可能
              </li>
              <li>記録データを家族やヘルパーとPDF出力で共有</li>
              <li>
                介護に役立つ情報を継続的に更新し、初心者でも学びやすい設計
              </li>
              <li>直感的に操作できるUIで、毎日の記録を継続しやすい</li>
            </ul>

            <h2>アプリを使うメリット</h2>
            <p>
              このアプリを使うことで、介護者の負担を軽減し、介護を受ける方の健康状態を適切に把握できます。
              また、データ出力を活用して家族やヘルパーと記録を共有することで、
              よりスムーズな連携につながります。
            </p>

            <h2>アプリのダウンロード方法</h2>
            <p>このアプリは現在、以下のリンクからダウンロード可能です。</p>
            <ul>
              <li>
                <a
                  href="https://apps.apple.com/jp/app/%E8%87%AA%E5%AE%85%E3%81%A7%E7%B0%A1%E5%8D%98-%E5%9C%A8%E5%AE%85%E4%BB%8B%E8%AD%B7%E3%83%BC%E4%BB%8B%E8%AD%B7%E8%A8%98%E9%8C%B2%E3%82%A2%E3%83%97%E3%83%AA/id6738299675"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store からダウンロード
                </a>
              </li>
            </ul>

            <h2>最後に</h2>
            <p>
              在宅介護をサポートするために、このアプリが少しでもお役に立てれば幸いです。
              日笠泰彰は今後も機能改善と情報発信を続け、より使いやすい介護支援アプリを目指していきます。
            </p>
          </div>

          <AuthorProfile />
        </article>
      </main>
    </>
  );
};

export default PostPage;
