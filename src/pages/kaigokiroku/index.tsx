import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import { NextSeo } from 'next-seo';
import {
  FaAccessibleIcon,
  FaShareAlt,
  FaUserNurse,
  FaConciergeBell,
  FaLaptopMedical,
} from 'react-icons/fa';
import styles from './Kaigokiroku.module.css';
import Breadcrumb from '../../components/Breadcrumb';

export default function Kaigokiroku() {
  return (
    <>
      {/* SEO 設定 */}
      <NextSeo
        title="在宅介護を支援するスマホアプリ"
        description="在宅介護の記録管理を簡単にできるスマホアプリ。家族や施設関係者とスムーズに情報共有が可能です。介護現場と同レベルの詳細な記録と多機能サポートを提供します。"
        canonical="https://nshinri.net/kaigokiroku"
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: 'https://nshinri.net/kaigokiroku',
          title: '在宅介護を支援するスマホアプリ',
          description:
            '在宅介護の記録管理を簡単にできるスマホアプリ。家族や施設関係者とスムーズに情報共有が可能です。',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: '在宅介護アプリのOGP画像',
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
              name: '在宅介護アプリ',
              url: 'https://nshinri.net/kaigokiroku',
              description:
                '在宅介護の記録管理を簡単にできるスマホアプリ。家族や施設関係者とスムーズに情報共有が可能です。',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'iOS, Android',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '524',
              },
              offers: {
                '@type': 'Offer',
                price: '300', // 月額料金
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
                eligibleDuration: 'P1M', // 1か月ごとのサブスクリプションを表す
                eligibleRegion: {
                  '@type': 'Country',
                  name: '日本',
                },
                priceValidUntil: '2024-12-31', // 現在の料金が有効な期間（適宜設定）
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: '在宅介護アプリ',
              image: ['https://nshinri.net/1.png', 'https://nshinri.net/2.png'],
              description:
                '在宅介護の記録管理を簡単にできるスマホアプリ。家族や施設関係者とスムーズに情報共有が可能です。',
              brand: {
                '@type': 'Brand',
                name: 'Nshinri Apps',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '524',
              },
              offers: {
                '@type': 'Offer',
                price: '300', // 月額料金
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
                eligibleDuration: 'P1M', // 1か月ごとのサブスクリプション
                eligibleRegion: {
                  '@type': 'Country',
                  name: '日本',
                },
                priceValidUntil: '2024-12-31',
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
          <h1>在宅介護をプロ目線で支援するスマホアプリ</h1>

          <div className={styles.highlightBox}>
            在宅介護で何をどのように介護記録を残したらいいか、何をどのようにケアマネージャーや介護施設側へ情報連携すればいいか、悩んだことはございませんか？
          </div>

          <p className={styles.heroText}>
            <u>直感的に簡易にかつ介護現場と同じレベルで</u>
            日々の介護記録を簡単に管理でき、
            <br />
            施設など介護関係者とスムーズに情報連携が可能なスマホアプリです。
          </p>

          <div className={styles.captureImages}>
            <img
              src="1.png"
              alt="在宅介護アプリのキャプチャ画面1"
              className={styles.captureImage}
            />
            <img
              src="2.png"
              alt="在宅介護アプリのキャプチャ画面2"
              className={styles.captureImage}
            />
          </div>

          <button className={styles.ctaButton}>→準備中</button>
        </section>

        <section className={styles.featureSection}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaAccessibleIcon />
            </div>
            <h2>シンプルで使いやすい</h2>
            <p>
              難しい操作は一切なく、スマホアプリに慣れていない方でも誰でも簡単に操作できるように設計されています。
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaLaptopMedical />
            </div>
            <h2>直感的なUI</h2>
            <p>
              画面を見ればどこで何が出来るか一目瞭然。ストレスなく簡易に日々の介護記録を入力、確認できます。
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaUserNurse />
            </div>
            <h2>介護福祉士で現役ITエンジニアが開発</h2>
            <p>
              シンプルなアプリながら、介護記録の内容は本場介護施設での介護記録と同水準の内容を記録できるように開発いたしました。
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaShareAlt />
            </div>
            <h2>情報共有</h2>
            <p>
              介護現場と同水準の詳細な記録ができるため、家族や関係者との情報共有や連携がスムーズに行えます。
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaConciergeBell />
            </div>
            <h2>多機能サポート</h2>
            <p>
              食事、排泄、睡眠、バイタル管理など、多角的に介護をサポートできる機能が揃っています。
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaConciergeBell />
            </div>
            <h2>無料トライアル</h2>
            <p>
              ３日間の無料トライアルを実施中です。まずはお試しいただき、介護記録の管理を体験してみてください。
            </p>
          </div>
        </section>

        <button className={styles.footerCta}>→準備中</button>
      </div>
    </>
  );
}
