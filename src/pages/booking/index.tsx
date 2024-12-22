import Head from 'next/head';
import styles from './booking.module.css'; // CSSモジュールをインポート
import Header from '../../components/counselingHeader';
import Breadcrumb from '../../components/Breadcrumb';
import { NextSeo } from 'next-seo';

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://nshinri.net',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '心理カウンセリング',
      item: 'https://nshinri.net/counseling',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '予約案内',
      item: 'https://nshinri.net/counseling/booking',
    },
  ],
};

const Booking = () => {
  return (
    <>
      <NextSeo
        title="心理カウンセリング予約 - Nくん"
        description="オンラインカウンセリングの予約方法をご案内します。Google MeetとLINEで簡単に予約できます。"
        canonical="https://nshinri.net/counseling/booking"
        openGraph={{
          title: '心理カウンセリング予約 - Nくん',
          description:
            'オンラインカウンセリングの予約方法をご案内します。Google MeetとLINEで簡単に予約できます。',
          url: 'https://nshinri.net/counseling/booking',
          site_name: '心理カウンセリング - Nくん',
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </Head>
      <Header />
      <div className={styles.container}>
        <Breadcrumb />
        <h1 className={styles.heading}>カウンセリング予約のご案内</h1>
        <p className={styles.subtext}>
          Nくんの心理カウンセリングをご希望の方は、以下の手順で簡単に予約を進めていただけます。
        </p>

        {/* カウンセリング方法の説明 */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>ご利用方法</h2>
          <ul className={styles.list}>
            <li>カウンセリングはすべてオンラインで行います。</li>
            <li>
              使用ツールはGoogle Meetです。予約確定後、Google
              MeetリンクをLINEでお送りします。
            </li>
            <li>営業時間は平日19時〜22時です。</li>
          </ul>
        </div>

        {/* 予約方法の説明 */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>予約手順</h2>
          <ol className={styles.list}>
            <li>
              <strong>LINE公式アカウントを友達追加</strong>
              <br />
              下のボタンからLINEのビジネスアカウントを友達追加してください。
            </li>
            <li>
              <strong>希望日時をLINEで送信</strong>
              <br />
              「希望日時」と「簡単な相談内容」をLINEでお送りください。
            </li>
            <li>
              <strong>予約確定</strong>
              <br />
              予約確定後、Google Meetのリンクをお送りします。
            </li>
          </ol>
          <button
            className={styles.lineButton}
            onClick={() =>
              window.open('https://line.me/R/ti/p/LINE_ID', '_blank')
            }
          >
            LINE公式アカウントを友達追加
          </button>
        </div>

        {/* 料金案内 */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>料金案内</h2>
          <ul className={styles.list}>
            <li>
              初回カウンセリング（60分）: <strong>3,000円</strong>
            </li>
            <li>
              2回目以降（60分）: <strong>5,000円</strong>
            </li>
          </ul>
          <p className={styles.note}>
            ※お支払いはPayPayで対応しております。
            <br />
            詳細はLINEにてお伝えします。
          </p>
        </div>

        {/* 注意事項 */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>注意事項</h2>
          <ul className={styles.list}>
            <li>予約のキャンセルは24時間前までにご連絡ください。</li>
            <li>開始時間に遅れる場合は事前にご連絡をお願いいたします。</li>
            <li>深刻な精神疾患については専門医をご利用ください。</li>
          </ul>
        </div>

        {/* 行動を促すボタン */}
        <div className={styles.actionBlock}>
          <h2 className={styles.bannerText}>今すぐ予約を始めましょう！</h2>
          <button
            className={styles.lineButton}
            onClick={() =>
              window.open('https://line.me/R/ti/p/LINE_ID', '_blank')
            }
          >
            LINE公式アカウントを友達追加
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
