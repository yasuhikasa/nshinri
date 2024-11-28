import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '社会的孤立を乗り越える方法';
export const description =
  'うつ病や社会からのドロップアウトで孤立してしまった人が、再スタートを切るためのステップについて解説します。';
export const date = '2024-11-06';
export const author = 'Nくん';
export const content = `
  <h2>孤立から再スタートを切る方法</h2>
  <p>社会的孤立は、特にうつ病や人間関係のトラブルなどで社会とのつながりが薄れてしまったときに起こりがちです。孤立は、自己否定や無力感を強めるだけでなく、再び社会に参加するための一歩を踏み出す意欲を奪ってしまいます。しかし、少しずつでも前に進むことで、必ず「新しい自分」を取り戻す道が見えてきます。</p>
  <p>ここでは、社会的孤立から抜け出し、再スタートを切るための具体的なステップについてお伝えします。</p>

  <h2>1. 自分の「小さな目標」を見つける</h2>
  <p>再スタートのためには、無理に大きな目標を持つ必要はありません。まずは「毎日散歩する」「好きな本を読む」など、小さな行動を目標にすることが大切です。目標が達成できたときの充実感や「自分にもできる」という感覚が、徐々に自己肯定感を高めることにつながります。</p>

  <h2>2. 社会との接点を増やす</h2>
  <p>孤立を感じているときは、他者と接点を持つのが怖く感じることがあります。最初は大きな集まりに行く必要はありません。地域のボランティア活動に参加する、興味のあるワークショップや趣味のイベントに顔を出してみるといった、小さな集まりに参加することで、無理なく社会とのつながりを取り戻せるでしょう。</p>
  <p>また、オンラインでの交流も有効です。SNSやコミュニティで自分の興味に合うグループに参加することで、リアルな人間関係への一歩を踏み出しやすくなります。</p>

  <h2>3. 自分を責めない姿勢を持つ</h2>
  <p>孤立してしまった自分に対して「自分が悪い」と責める気持ちは、状況をさらに悪化させます。過去の出来事や失敗に固執せず、今の自分にできることに意識を向けることが大切です。自分を少しずつ受け入れることで、前に進む意欲が湧いてきます。</p>

  <h2>4. 誰かに話を聞いてもらう</h2>
  <p>孤立した状況で自分の感情や悩みを抱え込むと、心がどんどん重くなってしまいます。信頼できる友人や家族に話すのが難しい場合は、カウンセリングを利用するのも一つの手段です。カウンセリングでは、安心できる環境で自分の気持ちを話すことができるため、少しずつ孤立から抜け出すきっかけとなります。</p>

  <h2>5. 再スタートには時間がかかることを理解する</h2>
  <p>孤立から抜け出し、再び社会とのつながりを持つには時間がかかります。焦らず、少しずつ自分のペースで進むことが大切です。「今は少しずつ準備をしている」と自分を許す気持ちを持ちましょう。時間をかけて取り組むことで、新しい自分の居場所を見つけることができるはずです。</p>

  <h2>まとめ</h2>
  <p>社会的孤立から再スタートを切ることは、誰にとっても簡単なことではありません。しかし、一歩ずつ小さな目標を積み重ねていくことで、孤立の壁を乗り越え、少しずつ新しい自分を見つけることができます。</p>
  <p>再スタートには時間がかかるものですが、無理をせず自分のペースで進むことで、必ず明るい未来が待っているはずです。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/social-isolation',
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
          url: 'https://nshinri.net/posts/social-isolation',
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
