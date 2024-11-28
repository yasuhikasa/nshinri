import React from 'react';
import Header from '../../components/Header'; // 共通ヘッダーがあれば使用
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  // 構造化データのJSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー',
    description:
      '当サイトのプライバシーポリシーページです。個人情報の取り扱いについて詳しく説明しています。',
    url: 'https://nshinri.net/privacy-policy', // 自サイトの正しいURLを指定
    publisher: {
      '@type': 'Organization',
      name: "N's WorkRoom",
      logo: {
        '@type': 'ImageObject',
        url: 'https://nshinri.net/me.png', // サイトのロゴ画像URL
        width: 300,
        height: 300,
      },
    },
  };

  return (
    <div className={styles.container}>
      {/* NextSeoによるSEO設定 */}
      <NextSeo
        title="プライバシーポリシー | N's WorkRoom"
        description="当サイトのプライバシーポリシーページです。個人情報の取り扱いについて詳しく説明しています。"
        canonical="https://nshinri.net/privacy-policy" // ページの正規URL
        openGraph={{
          title: "プライバシーポリシー | N's WorkRoom",
          description:
            '当サイトのプライバシーポリシーページです。個人情報の取り扱いについて詳しく説明しています。',
          url: 'https://nshinri.net/privacy-policy',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: "N's WorkRoomのロゴ",
            },
          ],
          site_name: "N's WorkRoom",
        }}
        twitter={{
          handle: '@6209316426525',
          site: '@6209316426525',
          cardType: 'summary_large_image',
        }}
      />
      {/* 構造化データを挿入 */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* ヘッダー */}
      <Header />
      <Breadcrumb />
      {/* メインコンテンツ */}
      <main className={styles.main}>
        <h1 className={styles.heading}>プライバシーポリシー</h1>
        <p>当サイトでは、以下の通り個人情報を取り扱います。</p>

        <section className={styles.section}>
          <h2 className={styles.subheading}>1. 個人情報の収集について</h2>
          <p>
            当サイトでは、問い合わせフォームなどを通じて、必要に応じて以下の情報を収集する場合があります:
          </p>
          <ul className={styles.list}>
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>その他、必要に応じた情報</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>2. 個人情報の利用目的</h2>
          <p>収集した情報は以下の目的に使用されます:</p>
          <ul className={styles.list}>
            <li>サービスの提供および改善</li>
            <li>お問い合わせへの対応</li>
            <li>その他、明示した目的</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>3. 個人情報の共有について</h2>
          <p>
            当サイトでは、以下の場合を除き、個人情報を第三者に提供することはありません:
          </p>
          <ul className={styles.list}>
            <li>本人の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>サービス提供のために必要な場合（例: 配送業者への情報提供）</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>4. セキュリティ対策</h2>
          <p>
            個人情報の漏洩、改ざん、紛失を防ぐために、適切なセキュリティ対策を講じます。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>5. プライバシーポリシーの変更</h2>
          <p>
            本ポリシーは、必要に応じて変更する場合があります。変更後のポリシーは、当ページでお知らせします。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>6. お問い合わせ</h2>
          <p>
            プライバシーポリシーに関するお問い合わせは、お問い合わせフォームよりお願いいたします。
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
