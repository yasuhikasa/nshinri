import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/Header';
import Head from 'next/head'; // Headをインポート
import styles from './Post.module.css';

interface PostProps {
  content: string;
  title: string;
  date: string;
  description: string;
  slug: string;
}

const Post = ({ content, title, date, description, slug }: PostProps) => {
  return (
    <>
      {/* SEOやOGPのためのHeadタグ */}
      <Head>
        <title>{title} - 心理カウンセリングコラム</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/me.png" />
        <meta property="og:url" content={`https://nshinri.net/posts/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/x.png" />
      </Head>

      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{date}</p>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { content, data } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      content: contentHtml,
      title: data.title,
      date: data.date,
      description: data.description, // descriptionを追加
    },
  };
}

export default Post;
