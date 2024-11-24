import Image from 'next/image';
import Head from 'next/head';
import styles from './index.module.css'; // CSSモジュールをインポート
import Header from '../components/Header';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
  console.log('postsDirectory:', postsDirectory); // ディレクトリパスを確認

  if (!fs.existsSync(postsDirectory)) {
    console.error('ディレクトリが存在しません:', postsDirectory);
    return {
      props: {
        notifications: [],
      },
    };
  }

  const filenames = fs.readdirSync(postsDirectory);
  console.log('filenames:', filenames); // ファイル名一覧を確認

  if (filenames.length === 0) {
    console.warn('通知ファイルが見つかりません');
    return {
      props: {
        notifications: [],
      },
    };
  }

  const notifications = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    console.log('filePath:', filePath); // 各ファイルのパスを確認

    const fileContents = fs.readFileSync(filePath, 'utf8');
    console.log('fileContents:', fileContents); // ファイル内容を確認

    const { data } = matter(fileContents);
    console.log('data:', data); // 解析したデータを確認

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  notifications.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  console.log('notifications:', notifications); // 最終的な通知データを確認

  return {
    props: {
      notifications,
    },
  };
}

// 構造化データのJSON-LD形式
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: "N's WorkRoom",
  url: 'https://nshinri.net',
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

const Home = ({
  notifications,
}: {
  notifications?: {
    slug: string;
    title: string;
    date: string;
    description: string;
  }[];
}) => {
  const safeNotifications = notifications || [];

  return (
    <>
      {/* NextSeoを使ったSEO設定 */}
      <NextSeo
        title="N's WorkRoom"
        description="Nくんの個人活動ページです。心理カウンセリング、ライフコーチング、Kindle出版などの情報を発信しています。"
        canonical="https://nshinri.net"
        openGraph={{
          title: "N's WorkRoom",
          description:
            'Nくんの個人活動ページです。心理カウンセリング、ライフコーチング、Kindle出版などの情報を発信しています。',
          url: 'https://nshinri.net',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: "N's WorkRoomのOGP画像",
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
      {/* 構造化データをスクリプトとして挿入 */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header /> {/* ヘッダーを表示 */}
      <div className={styles.container}>
        {/* トップ部分 */}
        <h1 className={styles.heading}>N&apos;s WorkRoomとは</h1>
        <p className={styles.subtext}>
          普段はITエンジニアとして会社員として働くかたわら、
          <br />
          「Nくん」として個人活動として行なっているページです。
          <br />
        </p>
        {/* <div>
          <Link href="/aboutme"  legacyBehavior>
            <a className={styles.link}>・Nくんについて</a>
          </Link>
        </div> */}

        {/* SNSリンク */}
        <div className={styles.sns}>
          <a
            href="https://x.com/N6209316426525"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/x.png" alt="x" width={60} height={60} />
            　⇦Xはこちらから
          </a>
        </div>

        <div className={styles.container}>
          {/* お知らせセクション */}
          <div className={styles.notifications}>
            <h2 className={styles.notificationsHeading}>記事更新</h2>
            <ul className={styles.notificationList}>
              {safeNotifications.length > 0 ? (
                safeNotifications.map((note, index) => (
                  <li key={index} className={styles.notificationItem}>
                    <span className={styles.notificationDate}>{note.date}</span>
                    <Link href={`/posts/${note.slug}`} legacyBehavior>
                      <a className={styles.notificationTitle}>{note.title}</a>
                    </Link>
                  </li>
                ))
              ) : (
                <p>現在お知らせはありません。</p>
              )}
            </ul>
            {safeNotifications.length > 0 && (
              <div className={styles.notificationMore}>
                <Link href="/posts" legacyBehavior>
                  <a>過去の記事一覧はこちら &raquo;</a>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 在宅介護アプリ */}
        <h2 className={styles.heading}>N&apos;s WorkRoomの活動</h2>
        <h3 className={styles.subheading}>WEB・スマホアプリの個人開発</h3>
        <div className={styles.section}>
          <div className={styles.introduction}>
            <Link href="/kaigokiroku" legacyBehavior>
              <a>
                <Image
                  src="/3.png"
                  alt="在宅介護記録アプリ"
                  width={200}
                  height={200}
                />
                <p>→自宅で簡単！在宅介護記録アプリの詳細</p>
              </a>
            </Link>
          </div>
          <ul className={styles.list}>
            <li>・在宅で介護施設と同水準の介護記録をつけることができます</li>
            <li>・アプリに不慣れでも簡単操作のUI設計</li>
            <li>
              ・介護に不安な方でも簡単に介護記録を残して情報を共有できます
            </li>
            <li>・介護福祉士として働いてきた現役ITエンジニアが制作</li>
            <li>
              ・おじいさん、おばあさんの健康が心配な方も簡単に日々の状況を把握できます
            </li>
          </ul>
        </div>

        {/* カウンセリング */}
        <h3 className={styles.subheading}>
          カウンセリング、キャリアコーチング
        </h3>
        <div className={styles.section}>
          <div className={styles.introduction}>
            <Link href="/counseling" legacyBehavior>
              <a>
                <Image
                  src="/4.jpg"
                  alt="介護の悩み、社会復帰のカウンセリング"
                  width={200}
                  height={200}
                />
                <p>→介護の悩み、社会復帰、ライフコーチング</p>
              </a>
            </Link>
          </div>
          <ul className={styles.list}>
            <li>・介護のお悩み相談</li>
            <li>・心の病や社会を離脱してからのリスタートのお悩み相談</li>
            <li>・未経験からのIT転職相談</li>
          </ul>
        </div>

        {/* Kindle出版 */}
        <h3 className={styles.subheading}>電子書籍出版</h3>
        <div className={styles.section}>
          <div className={styles.introduction}>
            <Link href="https://x.gd/igk0F" legacyBehavior>
              <a>
                <Image
                  src="/5.jpeg"
                  alt="Kindle出版"
                  width={200}
                  height={200}
                />
                <p>→40歳未経験からの転職活動ーITエンジニアになった私</p>
              </a>
            </Link>
          </div>
          <ul className={styles.list}>
            <li>・未経験からのキャリア構築ノウハウ</li>
            <li>・40歳未経験からのITエンジニアへの転職体験談</li>
            <li>・転職活動のコツや面接対策</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
