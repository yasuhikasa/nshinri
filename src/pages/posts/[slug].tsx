import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/Header';
import Head from 'next/head';
import styles from './Post.module.css';

interface PostProps {
  content: string;
  title: string;
  date: string;
  description: string;
  slug: string;
  author: string;
}

const Post = ({ content, title, date, description, slug, author }: PostProps) => {
  // JSON-LD 形式の構造化データを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nshinri.net/posts/${slug}`
    },
    "headline": title,
    "description": description,
    "datePublished": date,
    "dateModified": date,
    "author": {
      "@type": "Person",
      "name": author // 著者名を追加
    },
    "publisher": {
      "@type": "Organization",
      "name": "心理カウンセリングとライフコーチング-Nくん",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nshinri.net/me.png" // ロゴ画像のURL
      }
    },
    "image": "https://nshinri.net/me.png" // コラムのメイン画像のURL
  };

  return (
    <>
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
        <meta name="keywords" content="うつ病, 介護, メンタル, カウンセリング, 心理, サポート" />
        <link rel="canonical" href={`https://nshinri.net/posts/${slug}`} />

        {/* JSON-LD構造化データをスクリプトとして挿入 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      description: data.description,
      author: data.author,
      slug: params.slug,
    },
  };
}

export default Post;
