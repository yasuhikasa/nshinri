import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import styles from './PostList.module.css';
import Header from '../../components/Header';

interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <>
    <Header /> {/* ヘッダーを表示 */}
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
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
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

  // 日付で新しいものが上に来るようにソート
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}


export default PostList;
