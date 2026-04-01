import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb';
import styles from './careBridgePosts.module.css';
import {
  getAllCareBridgeArticles,
  type CareBridgeArticleData,
} from '../../../content/care-bridge/articles';

type CareBridgePost = Pick<
  CareBridgeArticleData,
  'slug' | 'title' | 'description' | 'datePublished'
>;

const canonical = 'https://nshinri.net/care-bridge/posts';
const pageTitle = 'CareBridge 記事一覧 | 介護の共有をスムーズに';
const pageDescription =
  'CareBridge（介護のバトンタッチをスムーズにする記録・共有アプリ）に関する記事一覧。介護記録の共有、PDF出力、家族・施設・ケアマネ連携の考え方などをまとめます。';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://nshinri.net/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'CareBridge',
      item: 'https://nshinri.net/care-bridge',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '記事一覧',
      item: canonical,
    },
  ],
};

export async function getStaticProps() {
  const posts: CareBridgePost[] = getAllCareBridgeArticles()
    .map((a) => ({
      slug: a.slug,
      title: a.articleHeadline || a.title,
      description: a.description,
      datePublished: a.datePublished,
    }))
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

  return {
    props: {
      posts,
    },
  };
}

export default function CareBridgePostsIndex({
  posts,
}: {
  posts: CareBridgePost[];
}) {
  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonical,
          type: 'website',
          images: [{ url: 'https://nshinri.net/caregiving_app_icon.png' }],
          site_name: "N's WorkRoom",
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>
      <Header />
      <main className={styles.container}>
        <Breadcrumb currentLabel="CareBridge 記事一覧" />
        <h1 className={styles.heading}>CareBridge 記事一覧</h1>
        <p className={styles.lead}>{pageDescription}</p>

        <ul className={styles.list}>
          {(posts || []).map((post) => {
            const date = post.datePublished;
            return (
              <li key={post.slug} className={styles.item}>
                <Link
                  href={`/care-bridge/posts/${post.slug}`}
                  className={styles.link}
                >
                  <h2 className={styles.title}>{post.title}</h2>
                  {post.description && (
                    <p className={styles.desc}>{post.description}</p>
                  )}
                  {date && (
                    <div className={styles.meta}>
                      {new Date(date).toLocaleDateString('ja-JP')}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

