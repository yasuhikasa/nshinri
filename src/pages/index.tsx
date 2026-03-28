import Image from 'next/image';
import Head from 'next/head';
import styles from './index.module.css';
import Header from '../components/Header';
import RevealOnScroll from '../components/RevealOnScroll';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { getList } from '../lib/microcms';

interface ServiceOffer {
  title: string;
  summary: string;
  href: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
  external?: boolean;
}

interface Notification {
  slug: string;
  title: string;
  date: string;
  description: string;
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
  '日笠泰彰（ITエンジニア）の公式サイト。開発受託・介護領域のDX相談、キャリアカウンセリング、ライフコーチング、執筆・発信の情報をまとめています。';

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

const serviceOffers: ServiceOffer[] = [
  {
    title: 'Web・アプリ開発（受託・技術支援）',
    summary:
      '要件の整理から実装・改善まで。個人・小規模事業者向けに、スピード感のある開発と継続的な技術支援に対応します。',
    href: '/contact',
    cta: 'お問い合わせ',
    imageSrc: '/yasuaki-hikasa-1.png',
    imageAlt: '日笠泰彰開発・Web制作のイメージ',
  },
  {
    title: '介護・福祉領域のDX相談',
    summary:
      '現場・制度・システムのすれ違いを整理し、記録や運用の課題に対して、ITと現場の両面から伴走します。',
    href: '/contact',
    cta: '相談する',
    imageSrc: '/yasuaki-hikasa-3.png',
    imageAlt: '日笠泰彰介護・福祉とITをイメージしたビジュアル',
  },
  {
    title: 'キャリアカウンセリング・ライフコーチング',
    summary:
      'キャリア再設計やストレス整理、各種深刻な悩みなど、オンラインでの伴走支援（別サイトで詳細）。',
    href: 'https://secondpath.jp/',
    cta: 'サービス詳細を見る',
    external: true,
    imageSrc: '/yasuaki-hikasa-2.png',
    imageAlt: '日笠泰彰キャリアカウンセリング・ライフコーチングのイメージ',
  },
  {
    title: '執筆・メディア',
    summary:
      'キャリアや未経験からのエンジニア転職をテーマにした書籍・発信。技術記事はトップの Zenn・Qiita・note リンクから。',
    href: 'https://www.amazon.co.jp/dp/B0DNXPFD37/',
    cta: '書籍情報（Amazon）',
    external: true,
    imageSrc: '/yasuaki-hikasa-4.png',
    imageAlt: '日笠泰彰執筆・出版（Kindle書籍）のイメージ',
  },
];

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
          <h1 className={styles.heading}>N&apos;s WorkRoom</h1>
          <p className={styles.subtext}>
            ITエンジニアです。民間カウンセラー資格あり。
            <br />
            開発の受託・介護・福祉ドメインのDX相談、カウンセリング伴走・発信を行っています。
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
            このサイト内の記事更新とは別に、各サービス上の記事一覧ページでも発信しています。
          </p>
          <div className={styles.externalBlogLinks}>
            <a
              href="https://zenn.dev/yasuhikasa"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalBlogLink}
            >
              Zenn
            </a>
            <a
              href="https://qiita.com/hikasayasu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalBlogLink}
            >
              Qiita
            </a>
            <a
              href="https://note.com/jazzy_gecko3968"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalBlogLink}
            >
              note
            </a>
          </div>
        </section>

        <section className={styles.services} aria-labelledby="services-heading">
          <h2 id="services-heading" className={styles.servicesHeading}>
            事業・ご相談
          </h2>
          <p className={styles.servicesLead}>
            開発の受託から介護・福祉ドメインのDX、キャリア支援まで。内容のすり合わせからお気軽にどうぞ。
          </p>
          <div className={styles.serviceGrid}>
            {serviceOffers.map((offer, index) => (
              <RevealOnScroll
                key={offer.title}
                className={styles.serviceRevealShell}
                delayMs={index * 60}
              >
                <article className={styles.serviceCard}>
                  <div className={styles.serviceImageWrap}>
                    <Image
                      src={offer.imageSrc}
                      alt={offer.imageAlt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceCardBody}>
                    <h3 className={styles.serviceTitle}>{offer.title}</h3>
                    <p className={styles.serviceSummary}>{offer.summary}</p>
                    <div className={styles.serviceCta}>
                      {offer.external ? (
                        <a
                          href={offer.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {offer.cta}
                        </a>
                      ) : (
                        <Link href={offer.href}>{offer.cta}</Link>
                      )}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
