import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '未経験転職って大変';
export const description =
  '30歳後半からの未経験転職が抱える難しさと、それでも突破口を見つけて新しい道を切り開くためのヒントをご紹介します。';
export const date = '2024-11-27';
export const author = 'Nくん';
export const content = `
  <h2>未経験転職が抱える壁</h2>
  <p>未経験の分野への転職を目指す際、特に30歳後半になると、さまざまな壁に直面することがあります。企業が求める条件にマッチしにくいと感じたり、面接まで進むことすら難しいこともあるかもしれません。</p>
  <p>例えば、未経験であればあるほど、過去の職歴やスキルが直結しないために評価されづらく、採用担当者にとって「即戦力」としてのイメージが湧きにくいのが現実です。また、同じポジションを目指す若年層の応募者との競争も激しく、年齢を理由に不利とされる場面もあります。</p>

  <h2>管理経験やプラスアルファの重要性</h2>
  <p>特に30代後半からの転職では、管理経験や「プラスアルファ」のスキルが求められる傾向があります。ただの未経験者ではなく、「これまでの経験をどう活かせるか」を示すことが、採用へのカギとなります。</p>
  <p>例えば、以前の職場で培ったリーダーシップ、コミュニケーション能力、または特定分野での実績がある場合、それをアピールすることで差別化を図ることが可能です。さらに、資格取得や新しいスキルの習得を通じて、企業にとっての価値を高める努力が求められます。</p>

  <h2>突破口を見つけるには</h2>
  <p>未経験転職の成功には、戦略が重要です。まずは、応募する業界や職種について徹底的にリサーチを行い、自分の強みや過去の経験がどのように役立つかを明確にしましょう。</p>
  <p>また、ネットワーキングも有効な手段です。同じ業界を目指す仲間や、既にその分野で働いている人々とつながることで、情報やアドバイスを得ることができます。そして、自分に足りないスキルや知識がある場合は、オンラインコースや専門学校などを活用して積極的に学びましょう。</p>

  <h2>諦めないことが成功への近道</h2>
  <p>未経験転職は簡単ではありませんが、不可能ではありません。重要なのは、途中で諦めないこと。そして、自分の可能性を信じ、少しずつでも進み続けることが成功への近道です。</p>
  <p>採用担当者に自分の熱意やビジョンを伝えることができれば、年齢や経験の壁を超えて、新しいキャリアへの扉が開かれる可能性があります。行動を起こすことで、必ずどこかに突破口が見つかるはずです。</p>
  <p>これから未経験の分野に挑戦しようとしている方も、自分の力を信じて前に進み続けてください。一歩ずつの努力が、未来への道を切り開く力となります。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/mikeikentensyoku',
    },
    headline: title,
    description: description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://nshinri.net/aboutme',
    },
    publisher: {
      '@type': 'Organization',
      name: '心理カウンセリングとライフコーチング-Nくん',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nshinri.net/me.png',
        width: 300,
        height: 300,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://nshinri.net/me.png',
      width: 1200,
      height: 630,
    },
    articleBody: content,
  };

  return (
    <>
      {/* SEO 設定 */}
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: 'https://nshinri.net/posts/mikeikentensyoku',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: 'Nくんのロゴ',
            },
          ],
        }}
      />

      {/* JSON-LD 構造化データ */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* ヘッダー */}
      <Header />

      {/* パンくずリスト */}
      <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href="/">トップページ</Link>
          </li>
          <li>
            <Link href="/posts">記事一覧</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      {/* 記事コンテンツ */}
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{date}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

export default PostPage;
