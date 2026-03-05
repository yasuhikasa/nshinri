import React from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Header from '../../components/Header'; // 共通ヘッダー
import Breadcrumb from '../../components/Breadcrumb'; // パンくずリスト
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  // 構造化データのJSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'プライバシーポリシー',
    description:
      'このアプリでは、ユーザーの個人情報を適切に取り扱います。本プライバシーポリシーでは、収集した情報の利用目的や保護対策について詳しく説明しています。',
    url: 'https://nshinri.net/privacy-policy', // アプリ専用のURL
    publisher: {
      '@type': 'Organization',
      name: "N's WorkRoom",
      logo: {
        '@type': 'ImageObject',
        url: 'https://nshinri.net/me.png',
        width: 300,
        height: 300,
      },
    },
  };

  return (
    <div className={styles.container}>
      {/* SEO設定 */}
      <NextSeo
        title="プライバシーポリシー | N's WorkRoom"
        description="このアプリでは、ユーザーの個人情報を適切に取り扱います。本プライバシーポリシーでは、収集した情報の利用目的や保護対策について詳しく説明しています。"
        canonical="https://nshinri.net/privacy-policy"
        openGraph={{
          title: "プライバシーポリシー | N's WorkRoom",
          description:
            'このアプリでは、ユーザーの個人情報を適切に取り扱います。本プライバシーポリシーでは、収集した情報の利用目的や保護対策について詳しく説明しています。',
          url: 'https://nshinri.net/privacy-policy',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: "日笠泰彰によるN's WorkRoomのロゴ",
            },
          ],
          site_name: "N's WorkRoom",
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

        <section className={styles.section}>
          <h2 className={styles.subheading}>第1条（個人情報の定義）</h2>
          <p>
            本プライバシーポリシーにおける「個人情報」とは、個人情報保護法に定義される「生存する個人に関する情報」を指します。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>第2条（個人情報の収集方法）</h2>
          <p>当アプリでは、以下の方法によりユーザーの個人情報を収集します。</p>
          <ul className={styles.list}>
            <li>ユーザーが登録フォームに入力する情報</li>
            <li>サービス利用に伴い自動的に収集される情報</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>第3条（個人情報の利用目的）</h2>
          <p>収集した個人情報は、以下の目的で利用します。</p>
          <ul className={styles.list}>
            <li>ユーザーへのサービス提供および運営のため</li>
            <li>ユーザーサポートのため</li>
            <li>サービスの改善および新サービス開発のため</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>第4条（個人情報の第三者提供）</h2>
          <p>
            当アプリでは、ユーザーの同意がある場合を除き、第三者に個人情報を提供することはありません。ただし、以下の場合を除きます。
          </p>
          <ul className={styles.list}>
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体または財産の保護のために必要がある場合で、本人の同意を得ることが困難な場合
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>
            第5条（個人情報の開示・訂正・削除）
          </h2>
          <p>
            ユーザーは、当アプリに対して自己の個人情報の開示、訂正、削除を求めることができます。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>
            第6条（プライバシーポリシーの変更）
          </h2>
          <p>
            本ポリシーは、必要に応じて変更されることがあります。変更後のポリシーは、当アプリ内で通知されるものとします。
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheading}>第7条（お問い合わせ）</h2>
          <p>
            プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。
          </p>
          <p>メールアドレス: info@sinamonoinfo.com</p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
