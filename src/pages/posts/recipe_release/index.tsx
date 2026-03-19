import Header from '../../../components/Header';
import AuthorProfile from '../../../components/AuthorProfile';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../PostDetail.module.css';

export const title = 'こだわりの創作料理レシピ作成アプリ、販売開始しました！';
export const description =
  '日笠泰彰が開発したAIレシピ作成アプリをご紹介します。こだわり条件に合わせてレシピを提案し、毎日の料理をより楽しくする機能と活用メリットを解説します。';
export const date = '2025-01-13';
export const author = '日笠泰彰';

const articleBody =
  '日笠泰彰が開発したAIレシピ作成アプリは、こだわり条件に合わせたレシピ提案を通じて、毎日の料理をより楽しくすることを目指しています。' +
  '材料や調理時間、気分に合わせてレシピを提案し、忙しい日でも手軽に創作料理へ挑戦できる設計です。';

const PostPage = () => {
  const url = 'https://nshinri.net/posts/recipe_release';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://nshinri.net/aboutme',
    },
    publisher: { '@type': 'Organization', name: '日笠泰彰' },
    articleBody,
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [{ url: 'https://nshinri.net/me.png' }],
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
        <nav className={`${styles.breadcrumb} ${styles.breadcrumbNav}`}>
          <Link href="/">トップ</Link> ＞ <Link href="/posts">記事一覧</Link> ＞
          現在の記事
        </nav>

        <article>
          <header className={styles.articleHeader}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.metaRow}>
              <span>📅 {date}</span>
              <span>👤 著者: {author}</span>
            </div>
          </header>

          <div className={styles.content}>
            <h2>こだわりの創作料理レシピアプリ</h2>
            <p>
              毎日の食卓に変化を加えたい方に向けて、「こだわりの創作料理レシピ」アプリをリリースしました。
              日笠泰彰が開発したこのアプリは、AIの提案力を活かしながら、
              ユーザーの好みに合わせたレシピ選びをサポートします。
            </p>

            <h2>アプリの主な機能</h2>
            <ul>
              <li>最先端AIがあなたのこだわりに合わせてレシピを作成</li>
              <li>豊富なテンプレートから好みの方向性を選択可能</li>
              <li>シンプルな操作で、手軽に創作レシピを作成できるUI</li>
              <li>気分や食材に応じたレシピ提案で日常の献立をサポート</li>
              <li>レシピ保存機能で、自分だけのレシピ集を作成可能</li>
            </ul>

            <h2>アプリを使うメリット</h2>
            <p>
              「こだわりの創作料理レシピ」アプリを使うことで、毎日の料理がもっと楽しく、
              こだわりのあるものに変わります。忙しい日でも、条件入力だけで効率よく献立を決められるため、
              食事づくりの負担軽減にもつながります。
            </p>

            <h2>アプリのダウンロード方法</h2>
            <p>このアプリは現在、以下のリンクからダウンロード可能です。</p>
            <ul>
              <li>
                <a
                  href="https://apps.apple.com/us/app/%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%AE%E5%89%B5%E4%BD%9C%E6%96%99%E7%90%86%E3%83%AC%E3%82%B7%E3%83%94-%E7%B0%A1%E5%8D%98%E3%81%AB%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8A%E3%81%8C%E6%AF%8E%E6%97%A5%E3%81%AE%E9%A3%9F%E5%8D%93%E3%81%AB/id6739532255"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store からダウンロード
                </a>
              </li>
            </ul>

            <h2>最後に</h2>
            <p>
              日笠泰彰は、AIを活用しながら「毎日の料理体験をもっと前向きにする」ことを目指して開発を続けています。
              新しいレシピ作りを、ぜひこのアプリでお試しください。
            </p>
          </div>

          <AuthorProfile />
        </article>
      </main>
    </>
  );
};

export default PostPage;
