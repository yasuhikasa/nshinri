import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb';
import {
  getAllCareBridgeSlugs,
  getCareBridgeArticle,
} from '../../../content/care-bridge/articles';
import styles from './careBridgePostDetail.module.css';

const BASE = 'https://nshinri.net';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCareBridgeSlugs().map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const article = getCareBridgeArticle(slug);
  if (!article) return { notFound: true };

  return {
    props: {
      article,
    },
  };
};

export default function CareBridgePostPage({
  article,
}: {
  article: ReturnType<typeof getCareBridgeArticle>;
}) {
  if (!article) return null;
  const url = `${BASE}/care-bridge/posts/${article.slug}`;
  const title = article.title;
  const description = article.description;
  const datePublished = article.datePublished;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.articleHeadline,
    description,
    datePublished,
    author: {
      '@type': 'Person',
      name: '日笠泰彰',
      url: `${BASE}/aboutme`,
    },
    publisher: {
      '@type': 'Organization',
      name: "N's WorkRoom",
      url: BASE,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          images: [{ url: `${BASE}/caregiving_app_icon.png` }],
          site_name: "N's WorkRoom",
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />
      <main className={styles.container}>
        <Breadcrumb currentLabel={article.articleHeadline} />

        <nav className={styles.topNav} aria-label="CareBridge 記事ナビゲーション">
          <Link href="/care-bridge">CareBridge</Link>
          <span className={styles.sep}>/</span>
          <Link href="/care-bridge/posts">記事一覧</Link>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>{article.articleHeadline}</h1>
          {datePublished && (
            <p className={styles.meta}>
              {new Date(datePublished).toLocaleDateString('ja-JP')}
            </p>
          )}
          {description && <p className={styles.description}>{description}</p>}
        </header>

        <article>
          <div className={styles.content}>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className={styles.h2}>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className={styles.p}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <section className={styles.cta} aria-labelledby="carebridge-cta">
          <h2 id="carebridge-cta" className={styles.ctaTitle}>
            自宅介護記録のCareBridge
          </h2>
          <p className={styles.ctaText}>
            CareBridge のコンセプト（介護のバトンタッチをスムーズにする“架け橋ツール”）。
          </p>
          <Link href="/care-bridge" className={styles.bigCtaCard}>
            <span className={styles.bigCtaEyebrow}>CareBridge APP STOREでリリース中</span>
            <span className={styles.bigCtaMain}>
              記録 → PDF共有 → 連携のバトンタッチをスムーズにする
            </span>
            <span className={styles.bigCtaSub}>
              iOS / App Store・スマホ/タブレット対応
            </span>
            <span className={styles.bigCtaButton}>CareBridge のページへ</span>
          </Link>
        </section>
      </main>
    </>
  );
}

