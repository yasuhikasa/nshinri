import { GetStaticProps, GetStaticPaths } from 'next';
import { getList, getDetail } from '../../../lib/microcms';
import styles from '../PostDetail.module.css';
import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb';
import AuthorProfile from '../../../components/AuthorProfile';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

interface Post {
  id: string;
  title: string;
  publishedAt: string;
  content: string;
  description?: string;
}

export default function PostDetail({ post }: { post: Post }) {
  const url = `https://nshinri.net/posts/${post.id}`;
  const plainBody =
    typeof post.content === 'string'
      ? post.content.replace(/<[^>]*>/g, '')
      : '';
  const excerpt =
    post.description ||
    (plainBody
      ? plainBody.slice(0, 120) + (plainBody.length > 120 ? '…' : '')
      : '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: '日笠泰彰',
      url: 'https://nshinri.net/aboutme',
    },
    publisher: { '@type': 'Organization', name: '日笠泰彰' },
    articleBody: plainBody,
  };

  return (
    <>
      <NextSeo
        title={`${post.title} | 日笠泰彰`}
        description={excerpt}
        canonical={url}
        openGraph={{
          url,
          title: `${post.title} | 日笠泰彰`,
          description: excerpt,
          type: 'article',
          images: [{ url: 'https://nshinri.net/me.png' }],
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
      <main className={`${styles.container} ${styles.postMain}`}>
        <Breadcrumb currentLabel={post.title} />
        <article>
          <header className={styles.articleHeader}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.metaRow}>
              {/* <span>
                📅 {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </span> */}
              {/* <span>👤 著者: 日笠泰彰</span> */}
            </div>
          </header>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <AuthorProfile />
        </article>
      </main>
    </>
  );
}

// 全記事のパス（URL）を事前に生成する
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getList({ limit: 100 });
  const paths = data.contents.map((content: any) => `/posts/${content.id}`);

  return { paths, fallback: 'blocking' }; // 新しい記事も自動で生成
};

// 特定の記事データを取得する
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.slug as string;
  const data = await getDetail(id);

  return {
    props: {
      post: {
        ...data,
        id,
      },
    },
    revalidate: 10,
  };
};
