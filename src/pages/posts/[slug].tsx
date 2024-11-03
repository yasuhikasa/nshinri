import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/Header';
import { NextSeo } from 'next-seo';
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
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "心理カウンセリングとライフコーチング-Nくん",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nshinri.net/me.png"
      }
    },
    "image": "https://nshinri.net/me.png"
  };

  return (
    <>
      {/* NextSeo によるページごとの SEO 設定 */}
      <NextSeo
        title={`${title} - 心理カウンセリングコラム`}
        description={description}
        openGraph={{
          title: `${title} - 心理カウンセリングコラム`,
          description: description,
          url: `https://nshinri.net/posts/${slug}`,
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: 'カウンセリングコラムのプレビュー画像',
            },
          ],
        }}
      />

      {/* JSON-LD 構造化データをスクリプトとして挿入 */}
      <Head>
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
