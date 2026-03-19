import Image from 'next/image';
import Head from 'next/head';
import styles from './index.module.css';
import Header from '../components/Header';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { getList } from '../lib/microcms';

interface Notification {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface ActivityItem {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  points: string[];
}

export async function getStaticProps() {
  const { contents } = await getList({
    orders: '-publishedAt',
    fields: 'id,title,publishedAt,createdAt,description,content',
    limit: 5,
  });

  const notifications: Notification[] = (contents || []).map((post: any) => {
    const rawContent =
      typeof post.content === 'string'
        ? post.content.replace(/<[^>]*>/g, '')
        : '';
    const fallbackDescription = rawContent
      ? rawContent.slice(0, 80) + (rawContent.length > 80 ? '…' : '')
      : '説明未設定';

    return {
      slug: post.id,
      title: post.title ?? 'タイトル未設定',
      date: new Date(post.publishedAt || post.createdAt)
        .toISOString()
        .slice(0, 10),
      description: post.description || fallbackDescription,
    };
  });

  return {
    props: {
      notifications,
    },
  };
}

const siteTitle = "日笠泰彰 | N's WorkRoom";
const siteDescription =
  '日笠泰彰（ITエンジニア）の公式サイト。個人開発アプリ、キャリアカウンセリング、ライフコーチング、執筆活動の最新情報を発信しています。';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: "N's WorkRoom",
      alternateName: '日笠泰彰 公式サイト',
      url: 'https://nshinri.net',
      inLanguage: 'ja-JP',
      publisher: {
        '@type': 'Person',
        name: '日笠泰彰',
        url: 'https://nshinri.net/aboutme',
      },
    },
    {
      '@type': 'Person',
      name: '日笠泰彰',
      url: 'https://nshinri.net/aboutme',
      image: 'https://nshinri.net/me.png',
      jobTitle: 'ITエンジニア・心理カウンセラー',
      worksFor: {
        '@type': 'Organization',
        name: "N's WorkRoom",
      },
    },
  ],
};

const activities: ActivityItem[] = [
  {
    href: '/kaigokiroku',
    imageSrc: '/3.png',
    imageAlt: '日笠泰彰による在宅介護記録アプリ',
    title: '自宅で簡単！在宅介護記録アプリ（販売終了）',
    points: [
      '在宅で介護施設と同水準の介護記録をつけられます',
      'アプリに不慣れでも使いやすいシンプルなUI設計',
      '介護記録の共有で、家族の状況把握がスムーズ',
      '介護福祉士経験のある現役ITエンジニアが制作',
    ],
  },
  {
    href: '/newrecipe',
    imageSrc: '/8.png',
    imageAlt: '日笠泰彰によるこだわりレシピ作成アプリ',
    title: 'こだわりの創作料理レシピ（販売終了）',
    points: [
      'AIが好みや条件に合わせてレシピを提案',
      'その日の気分やニーズに合わせて自動生成',
      '毎日の献立に新しいアイデアを取り入れやすい設計',
      '忙しい日でもこだわりのある料理を楽しめます',
    ],
  },
  {
    href: 'https://secondpath.jp/',
    imageSrc: '/4.jpg',
    imageAlt: '日笠泰彰によるキャリア相談・人生のリスタート',
    title: 'キャリアカウンセリング・ライフコーチング',
    points: [
      '30代・40代のキャリアリスタート相談',
      '心の課題や問題行動の克服サポート',
      '仕事のストレスや将来不安の整理',
      '自己肯定感を高めるための実践的な伴走支援',
    ],
  },
  {
    href: 'https://www.amazon.co.jp/dp/B0DNXPFD37/',
    imageSrc: '/5.jpeg',
    imageAlt: '日笠泰彰によるKindle出版',
    title: '40歳未経験でITエンジニアの軌跡',
    points: [
      '未経験からのキャリア構築ノウハウ',
      '40歳未経験からITエンジニアへの転職体験談',
      '転職活動のコツや面接対策を具体的に解説',
    ],
  },
];

const isExternalLink = (href: string) =>
  href.startsWith('http://') || href.startsWith('https://');

const Home = ({ notifications }: { notifications: Notification[] }) => {
  const safeNotifications = notifications || [];

  return (
    <>
      {/* NextSeoを使ったSEO設定 */}
      <NextSeo
        title={siteTitle}
        description={siteDescription}
        canonical="https://nshinri.net"
        openGraph={{
          title: siteTitle,
          description: siteDescription,
          url: 'https://nshinri.net',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: "日笠泰彰公式サイト N's WorkRoom のOGP画像",
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
      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.bannerWrapper}>
            <Image
              src="/top.jpg"
              alt="日笠泰彰によるN's WorkRoomバナー"
              width={1200}
              height={450}
              className={styles.bannerImage}
              priority={true}
            />
          </div>
          <h1 className={styles.heading}>
            日笠泰彰の活動拠点 N&apos;s WorkRoom
          </h1>
          <p className={styles.subtext}>
            ITエンジニアです。民間カウンセラー資格あり。
            <br />
            個人開発・相談支援・発信活動を継続しています。
          </p>
        </section>

        <section
          className={styles.notifications}
          aria-labelledby="news-heading"
        >
          <h2 id="news-heading" className={styles.notificationsHeading}>
            記事更新
          </h2>
          <ul className={styles.notificationList}>
            {safeNotifications.length > 0 ? (
              safeNotifications.slice(0, 5).map((note) => (
                <li key={note.slug} className={styles.notificationItem}>
                  <time className={styles.notificationDate}>{note.date}</time>
                  <Link
                    href={`/posts/${note.slug}`}
                    className={styles.notificationTitle}
                  >
                    {note.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className={styles.notificationEmpty}>
                現在お知らせはありません。
              </li>
            )}
          </ul>
          {safeNotifications.length > 0 && (
            <div className={styles.notificationMore}>
              <Link href="/posts">過去の記事一覧を見る</Link>
            </div>
          )}
        </section>

        <section
          className={styles.externalBlogSection}
          aria-labelledby="external-blog-heading"
        >
          <h2 id="external-blog-heading" className={styles.externalBlogHeading}>
            外部技術ブログの更新
          </h2>
          <p className={styles.externalBlogText}>
            このサイト内の記事更新とは別に、技術ブログサイトでの更新も行っています。
          </p>
          <div className={styles.externalBlogLinkWrap}>
            <Link href="/zenn" className={styles.externalBlogLink}>
              Zenn・Qiita・note の更新一覧を見る
            </Link>
          </div>
        </section>

        <section
          className={styles.activities}
          aria-labelledby="activities-heading"
        >
          <h2 id="activities-heading" className={styles.activitiesHeading}>
            日笠泰彰の主な活動
          </h2>
          <div className={styles.activityGrid}>
            {activities.map((activity) => {
              const linkContent = (
                <>
                  <Image
                    src={activity.imageSrc}
                    alt={activity.imageAlt}
                    width={180}
                    height={180}
                    className={styles.activityImage}
                  />
                  <p className={styles.activityLinkText}>{activity.title}</p>
                </>
              );

              return (
                <article key={activity.title} className={styles.card}>
                  <div className={styles.introduction}>
                    {isExternalLink(activity.href) ? (
                      <a
                        href={activity.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.activityLink}
                      >
                        {linkContent}
                      </a>
                    ) : (
                      <Link
                        href={activity.href}
                        className={styles.activityLink}
                      >
                        {linkContent}
                      </Link>
                    )}
                  </div>
                  <ul className={styles.list}>
                    {activity.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
