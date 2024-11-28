import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '../../components/Header';
import Head from 'next/head';
import styles from './PostList.module.css';

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
        name: '記事一覧',
        item: 'https://nshinri.net/posts',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>記事一覧</title>
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
          <li aria-current="page">記事一覧</li>
        </ol>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.heading}>記事一覧</h1>
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
  const postsDirectory = path.join(process.cwd(), 'src', 'pages', 'posts'); // postsディレクトリへのパス
  const subdirectories = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory()) // ディレクトリのみ取得
    .map((dirent) => dirent.name);

  // 動的インポートで記事データを取得
  const posts: Post[] = (
    await Promise.all(
      subdirectories.map(async (subdir) => {
        try {
          const { title, date, description } = await import(
            `../../pages/posts/${subdir}/index`
          );

          // 未定義の場合にデフォルト値を設定
          if (!title || !date || !description) {
            console.warn(`記事データが不完全です: ${subdir}`);
            return null; // 不完全なデータは除外
          }

          return {
            slug: subdir,
            title: title || 'タイトル未設定',
            date: date || '日付未設定',
            description: description || '説明未設定',
          };
        } catch (error) {
          console.warn(`記事データの取得に失敗しました: ${subdir}`, error);
          return null; // エラーの場合は null を返す
        }
      })
    )
  ).filter((post): post is Post => post !== null); // null を除外

  // 日付順でソート
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}

export default PostList;
