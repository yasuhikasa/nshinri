import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title = '介護疲れとメンタルケアの重要性';
export const description =
  '介護疲れによる心の負担を軽減し、メンタルケアの重要性について考えます。介護に追われる日々の中でも、自分を見失わずに心の健康を守るためのアドバイスを提供します。';
export const date = '2024-10-27';
export const author = 'Nくん';
export const content = `
  <h2>介護疲れが心に与える影響</h2>
  <p>介護は、想像以上に心身に負担をかける活動です。家族や身近な人の介護をする中で、自分の時間や気持ちを削られる日々が続くと、心の疲れが溜まっていきます。<br>
  「休む暇がない」「自分が頑張らないと」と強く思いすぎると、次第に心のバランスが崩れ、気づけば自分自身を見失ってしまうことも。</p>

  <p>介護に必要なのは忍耐と愛情ですが、同時に、それは自分を犠牲にすることを意味してしまいがちです。知らず知らずのうちに限界を超えてしまうと、心の中で「もう限界かもしれない」「誰にも頼れない」と感じるようになります。</p>

  <h2>介護疲れと「生きにくさ」</h2>
  <p>介護を続けていると、自分の生活がどんどん狭まっていく感覚に陥ることがあります。<br>
  「どうして自分ばかり…」「自分も疲れているのに休めない」という思いが積もり、自分の時間が奪われ、孤独感や無力感に苛まれるようになるのです。<br>
  また、家族や友人に悩みを話しても、「大変だね」「頑張ってるね」と表面的な言葉だけで終わることも多く、実際の支えを感じにくいものです。</p>

  <p>このような「生きにくさ」を感じている方は多いのですが、自分一人でそれを抱え込んでいると、ますます心の負担が重くなってしまいます。</p>

  <h2>メンタルケアの重要性</h2>
  <p>介護疲れを抱える方にとって、心のケアを行うことは必要不可欠です。メンタルケアを通じて、自分の感情や悩みを整理し、少しでも心の負担を軽くすることが求められます。カウンセリングやサポートグループは、こうした状況を乗り越えるための大きな助けとなるでしょう。<br>
  「自分の気持ちを誰かに話すだけで救われた」という経験をした方も多く、これは心の負担を軽減する第一歩です。</p>

  <h2>自分の心を守るために</h2>
  <p>介護を続けるには、心と身体の健康があってこそです。<br>
  どんなに頑張っても、限界を超えると心が折れてしまうことがあります。<br>
  そのためにも、自分の心の声を聞きながら、適度に休息を取り、自分の感情を言葉にすることが大切です。</p>

  <p>もし介護に疲れ切ってしまい、誰にも相談できないと感じているなら、カウンセリングやメンタルケアを取り入れてみてください。<br>
  心の重荷を一人で抱えず、少しでも軽くする方法を見つけることで、介護の負担も和らげることができるでしょう。</p>

  <h2>介護者のためのカウンセリング</h2>
  <p>カウンセリングは、介護に疲れている方にとって、心を休めるための場所です。<br>
  「もうこれ以上耐えられない」「どうすればいいかわからない」と感じたとき、専門のカウンセラーに相談することで、新しい視点や解決策が見つかるかもしれません。<br>
  自分が介護する立場でも、時には「自分が助けを求めてもいい」ということを忘れないでください。</p>

  <p>どんなに小さな変化でも、それが心の余裕を取り戻すための大きな一歩です。カウンセリングを通じて、あなたの心に寄り添い、少しでも「生きやすい」日常を取り戻すお手伝いができればと思います。</p>
`;

const PostPage = () => {
  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nshinri.net/posts/care-kaigo',
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
          url: 'https://nshinri.net/posts/care-kaigo',
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
