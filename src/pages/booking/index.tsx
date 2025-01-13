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
        <p className={styles.subtext}>
          ※注意事項まで必ずお読みいただいた上で、予約をお願いいたします。
        </p>

        {/* カウンセリング方法の説明 */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>ご利用方法</h2>
          <ul className={styles.list}>
            <li>・営業時間は平日19:30〜22:00、土日祝10:00〜17:00です。</li>
            <li>・カウンセリングはすべてオンラインで行います。</li>
            <li>
              ・使用ツールはGoogle Meetです。予約確定後、Google
              MeetリンクをLINEでお送りします。
            </li>
            <li>
              ・事前に気になることは問い合わせフォームやLINEでのやり取りも可能です。
            </li>
            <li>・匿名OK、カウンセリング時はビデオOFFでも大丈夫です。</li>
          </ul>
        </div>

        {/* 予約方法の説明 */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>予約手順</h2>
          <ol className={styles.list}>
            <li>
              <strong>LINE公式アカウントを友達追加</strong>
              <br />
              下のボタンからLINEのアカウントを友達追加してください。
              <br />
              LINE内にて予約の案内がございますのでそれに従って予約をお願いいたします。
            </li>
            <li>
              <strong>希望日時をLINEで送信</strong>
              <br />
              「希望日時」と「簡単な相談内容」をLINEでお送りください。
            </li>
            <li>
              <strong>予約確定</strong>
              <br />
              日時の調整後、PayPayの支払いリンクをLINEにてお送りします。支払いにより予約確定となります。
              <br />
              予約確定後、Google MeetのリンクをLINEにてお送りします。
            </li>
          </ol>
          <a
            href="https://lin.ee/8rIfjx1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
              alt="友だち追加"
              className={styles.lineaddbutton}
            />
          </a>
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
            <li>・予約のキャンセルは24時間前までにご連絡ください。</li>
            <li>
              ・開始時間に遅れる場合は事前にご連絡をお願いいたします。希望時間での時間の調整が難しい場合は改めて日程をご相談させていただきます。
            </li>
            <li>・予約は希望日時の2日前までにお願いいたします。</li>
            <li>
              ・予約確定後は返金はいたしかねますことご了承ください。なお、支払い後カウンセリングを受けられなかった場合、次回に持ち越すことは可能です。
            </li>
            <li>
              ・深刻な精神疾患、医療的な判断については専門医をご利用ください。
            </li>
          </ul>
        </div>

        {/* 行動を促すボタン */}
        <div className={styles.actionBlock}>
          <h2 className={styles.bannerText}>今すぐ予約を始めましょう！</h2>
          <a
            href="https://lin.ee/8rIfjx1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
              alt="友だち追加"
              className={styles.lineaddbutton}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Booking;
