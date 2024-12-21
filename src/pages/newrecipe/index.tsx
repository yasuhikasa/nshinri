import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header2';
import { NextSeo } from 'next-seo';
import styles from './newrecipe.module.css';
import Breadcrumb from '../../components/Breadcrumb';

export default function NewRecipe() {
  return (
    <>
      {/* SEO 設定 */}
      <NextSeo
        title="こだわり料理レシピを簡単に！AIを使ったレシピ作成アプリ"
        description="材料や調理時間を指定すると、AIがあなたにぴったりのレシピを提案！簡単にレシピが見つかり、毎日の料理が楽しくなります。ポイントを消費してレシピを生成できます！"
        canonical="https://nshinri.net/newrecipe"
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: 'https://nshinri.net/newrecipe',
          title: 'こだわりレシピを作るアプリ',
          description:
            'AIを使ってあなたのこだわりにぴったりなレシピを提案するアプリ。材料、調理時間を指定して、簡単にレシピを見つけよう。ポイントを消費してレシピを生成！',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: 'レシピ作成アプリのOGP画像',
            },
          ],
        }}
        twitter={{
          handle: '@N6209316426525',
          site: '@N6209316426525',
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'レシピ作成アプリ',
              url: 'https://nshinri.net/newrecipe',
              description:
                'AIであなたのこだわりにぴったりなレシピを作成して提案します。レシピを生成するためには、ポイントを消費します。',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'iOS, Android',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '230',
              },
              offers: {
                '@type': 'Offer',
                price: '300', // ポイント消費料金
                priceCurrency: 'JPY',
                availability: 'https://schema.org/InStock',
                hasMerchantReturnPolicy: {
                  '@type': 'MerchantReturnPolicy',
                  name: '返品ポリシーなし',
                  applicableCountry: 'JP',
                },
                shippingDetails: {
                  '@type': 'OfferShippingDetails',
                  shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: '0', // 配送料は0円
                    currency: 'JPY',
                  },
                  shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'JP',
                  },
                },
                eligibleDuration: 'P1P', // ポイント課金制を表す（例：ポイント消費の1回あたりの料金）
                eligibleRegion: {
                  '@type': 'Country',
                  name: '日本',
                },
                priceValidUntil: '2026-12-31', // 現在の料金が有効な期間（適宜設定）
              },
            }),
          }}
        />
      </Head>

      {/* コンテンツ */}
      <div className={styles.container}>
        <Header />
        <Breadcrumb />
        <section className={styles.heroSection}>
          <h1>あなたのこだわりを形にするレシピ作成アプリ</h1>
          <div className={styles.highlightBox}>
            毎日の料理で、何を作るか迷ったことはありませんか？材料や時間を入力するだけで、あなたのこだわりに合ったレシピをAIが提案します。
          </div>
          <p className={styles.heroText}>
            <u>AIがあなたのこだわりにぴったりなレシピを</u>
            提案してくれるので、いつでも簡単に新しいレシピに挑戦できます。
          </p>
          <div className={styles.captureImages}>
            <img
              src="6.png"
              alt="レシピ作成アプリのキャプチャ画面1"
              className={styles.captureImage}
            />
            <img
              src="7.png"
              alt="レシピ作成アプリのキャプチャ画面2"
              className={styles.captureImage}
            />
          </div>
          <button className={styles.ctaButton}>→無料で試す</button>
        </section>

        <section className={styles.featureSection}>
          <div className={styles.featureCard}>
            <h2>シンプルで使いやすい</h2>
            <p>
              操作が簡単で、スマホを使い慣れていない方でも簡単に使えます。誰でもすぐにレシピ作成を楽しめます。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h2>直感的なUI</h2>
            <p>
              画面を見ればすぐに何をすれば良いかが分かり、ストレスフリーでレシピを作成できます。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h2>多機能サポート</h2>
            <p>
              材料、調理時間、人数など、細かい条件に合わせてレシピを提案。毎日の食事作りがもっと楽しくなります。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h2>情報共有</h2>
            <p>
              作成したレシピを家族や友達とシェアすることができ、みんなで楽しむことができます。
            </p>
          </div>
        </section>

        <button className={styles.footerCta}>→無料で試す</button>
      </div>
    </>
  );
}
