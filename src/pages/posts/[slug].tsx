import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Post.module.css';
import { getRelatedPosts } from '../../utils/getRelatedPosts'; // 関連記事取得関数を追加

interface PostProps {
  content: string;
  title: string;
  date: string;
  description: string;
  slug: string;
  author: string;
  relatedPosts: PostProps[];
}

const Post = ({
  content,
  title,
  date,
  description,
  slug,
  author,
  relatedPosts,
}: PostProps & { relatedPosts: PostProps[] }) => {
  // JSON-LD 形式の構造化データ（記事情報）
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nshinri.net/posts/${slug}`,
    },
    headline: title,
    description: description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: '心理カウンセリングとライフコーチング-Nくん',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nshinri.net/me.png',
      },
    },
    image: 'https://nshinri.net/me.png',
  };

  // JSON-LD パンクズリスト構造化データ
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
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://nshinri.net/posts/${slug}`,
      },
    ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <Header />

      {/* パンクズリストの表示 */}
      <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href="/">トップページ</Link>
          </li>
          <li>
            <Link href="/posts">コラム一覧</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{date}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* 関連記事セクション */}
      <div className={styles.relatedPosts}>
        <h2>関連記事</h2>
        <ul>
          {relatedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} legacyBehavior>
                <a>{post.title}</a>
              </Link>
              <p>{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
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
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { content, data } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // 関連記事を取得
  const relatedPosts = getRelatedPosts(params.slug);

  return {
    props: {
      content: contentHtml,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      slug: params.slug,
      relatedPosts,
    },
  };
}

export default Post;
