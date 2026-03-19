import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header2';
import { NextSeo } from 'next-seo';
import styles from './newrecipe.module.css';
import Breadcrumb from '../../components/Breadcrumb';

export default function NewRecipe() {
  const handleApple = () => {
    window.open(
      'https://apps.apple.com/us/app/%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%AE%E5%89%B5%E4%BD%9C%E6%96%99%E7%90%86%E3%83%AC%E3%82%B7%E3%83%94-%E7%B0%A1%E5%8D%98%E3%81%AB%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%8C%E6%AF%8E%E6%97%A5%E3%81%AE%E9%A3%9F%E5%8D%93%E3%81%AB/id6739532255',
      '_blank'
    );
  };
  return (
    <>
      {/* SEO 設定 */}
      <NextSeo
        title="AIレシピ作成アプリ | 日笠泰彰のこだわりレシピ生成アプリ"
        description="日笠泰彰が開発したAIレシピ作成アプリ。材料・時間・こだわり条件を入力するだけで、毎日の料理に合うレシピを簡単に提案します。"
        canonical="https://nshinri.net/newrecipe"
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: 'https://nshinri.net/newrecipe',
          title: 'AIレシピ作成アプリ | 日笠泰彰',
          description:
            '日笠泰彰が開発した、こだわり条件に合わせてAIが提案するレシピ作成アプリです。',
          images: [
            {
              url: 'https://nshinri.net/8.png',
              width: 1200,
              height: 630,
              alt: '日笠泰彰が開発したAIレシピ作成アプリのOGP画像',
            },
          ],
          site_name: "N's WorkRoom",
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
              author: {
                '@type': 'Person',
                name: '日笠泰彰',
                url: 'https://nshinri.net/aboutme',
              },
              creator: {
                '@type': 'Person',
                name: '日笠泰彰',
                url: 'https://nshinri.net/aboutme',
              },
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
          <button className={styles.footerCta} onClick={handleApple}>
            App Storeでダウンロードする
          </button>
        </section>

        <section className={styles.featureSection}>
          <div className={styles.featureCard}>
            <h2>豊富なこだわりテンプレート</h2>
            <p>
              １５種類以上のこだわりテンプレートが用意されており、自分のこだわりに合ったレシピを作成できます。（今後も追加予定）
            </p>
          </div>
          <div className={styles.featureCard}>
            <h2>直感的なUI</h2>
            <p>
              各料理ジャンルテンプレートでこだわりを選択してボタンを押すだけ。ストレスフリーでレシピを作成できます。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h2>最先端AIによるレシピ作成</h2>
            <p>
              材料、調理時間、人数など、細かい条件に合わせてAIがレシピを提案。毎日の食事作りがもっと楽しくなります。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h2>詳細なレシピ</h2>
            <p>
              必要な食材や調理手順、レシピに合うサイドメニューなど、レシピに関する情報が詳細に記載されています。
            </p>
          </div>
        </section>

        <button className={styles.footerCta} onClick={handleApple}>
          App Storeでダウンロードする
        </button>
      </div>
    </>
  );
}
