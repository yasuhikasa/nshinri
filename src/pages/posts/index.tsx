import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Header from '../../components/Header';
import Head from 'next/head';
import styles from './PostList.module.css';

interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  // JSON-LD パンくずリストの構造化データ
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
        name: 'コラム一覧',
        item: 'https://nshinri.net/posts',
      },
    ],
  };

  return (
    <>
      <Head>
        {/* JSON-LD 構造化データをスクリプトとして挿入 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <Header />

      {/* パンくずリストの表示 */}
      <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href="/">トップページ</Link>
          </li>
          <li aria-current="page">コラム一覧</li>
        </ol>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.heading}>コラム一覧</h1>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.listItem}>
              <Link href={`/posts/${post.slug}`} className={styles.link}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.date}>{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}

export default PostList;
