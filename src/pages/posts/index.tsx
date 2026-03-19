import Head from 'next/head';
import Link from 'next/link';
import styles from './PostList.module.css';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import { NextSeo } from 'next-seo';
import { getList } from '../../lib/microcms';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'トップページ',
        item: 'https://nshinri.net/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '記事一覧',
        item: 'https://nshinri.net/posts',
      },
    ],
  };

  return (
    <>
      <NextSeo
        title="記事一覧 | 日笠泰彰"
        description="日笠泰彰による開発・カウンセリング関連の記事を新しい順に掲載しています。"
        canonical="https://nshinri.net/posts"
        openGraph={{
          title: '記事一覧 | 日笠泰彰',
          description:
            '日笠泰彰による開発・カウンセリング関連の記事を新しい順に掲載しています。',
          url: 'https://nshinri.net/posts',
          type: 'website',
          images: [{ url: 'https://nshinri.net/me.png' }],
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

      <div className={styles.container}>
        <Breadcrumb />

        <h1 className={styles.heading}>記事一覧</h1>
        <p className={styles.intro}>
          日笠泰彰による開発・カウンセリング関連の記事を新しい順に掲載しています。
        </p>

        {(!posts || posts.length === 0) && (
          <p className={styles.empty}>記事がありません。</p>
        )}

        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.listItem}>
              <Link href={`/posts/${post.slug}`} className={styles.link}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.date}>{post.date}</p>
                <p className={styles.description}>{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const data = await getList({
    orders: '-publishedAt',
    fields: 'id,title,publishedAt,createdAt,description,content',
    limit: 100,
  });
  const contents = data.contents || [];
  console.log(data.totalCount);

  const posts: Post[] = (contents || []).map((post: any) => {
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
      posts,
    },
  };
}

export default PostList;
