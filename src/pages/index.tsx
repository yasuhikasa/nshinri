import Image from 'next/image';
import Head from 'next/head';
import styles from './index.module.css'; // CSSモジュールをインポート
import Header from '../components/Header';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import fs from "fs";
import path from "path";
import matter from "gray-matter";


export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "contents", "posts");
  console.log("postsDirectory:", postsDirectory); // ディレクトリパスを確認

  if (!fs.existsSync(postsDirectory)) {
    console.error("ディレクトリが存在しません:", postsDirectory);
    return {
      props: {
        notifications: [],
      },
    };
  }

  const filenames = fs.readdirSync(postsDirectory);
  console.log("filenames:", filenames); // ファイル名一覧を確認

  if (filenames.length === 0) {
    console.warn("通知ファイルが見つかりません");
    return {
      props: {
        notifications: [],
      },
    };
  }

  const notifications = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    console.log("filePath:", filePath); // 各ファイルのパスを確認

    const fileContents = fs.readFileSync(filePath, "utf8");
    console.log("fileContents:", fileContents); // ファイル内容を確認

    const { data } = matter(fileContents);
    console.log("data:", data); // 解析したデータを確認

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log("notifications:", notifications); // 最終的な通知データを確認

  return {
    props: {
      notifications,
    },
  };
}




// 構造化データのJSON-LD形式
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "心理カウンセリングとライフコーチング - Nくん",
  "url": "https://nshinri.net",
  "publisher": {
    "@type": "Organization",
    "name": "心理カウンセリングとライフコーチング - Nくん",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nshinri.net/me.png",
      "width": 300,
      "height": 300
    }
  }
};

const Home = ({ notifications }: { notifications?: { slug: string; title: string; date: string; description: string }[] }) => {
  const safeNotifications = notifications || [];

  return (
    <>
      {/* NextSeoを使ったSEO設定 */}
      <NextSeo
        title="心理カウンセリングとライフコーチング - Nくん"
        description="うつ病や生きにくさ、社会復帰、介護の悩みに寄り添い、具体的なサポートを提供します。"
        canonical="https://nshinri.net"
        openGraph={{
          title: "心理カウンセリングとライフコーチング - Nくん",
          description: "生きにくさに寄り添い、社会復帰や自己肯定感の回復をサポートします。",
          url: "https://nshinri.net",
          images: [
            {
              url: "https://nshinri.net/me.png",
              width: 1200,
              height: 630,
              alt: "心理カウンセリングとライフコーチングのOGP画像"
            },
          ],
          site_name: "心理カウンセリングとライフコーチング - Nくん",
        }}
        twitter={{
          handle: '@6209316426525',
          site: '@6209316426525',
          cardType: 'summary_large_image',
        }}
      />

      {/* 構造化データをスクリプトとして挿入 */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header /> {/* ヘッダーを表示 */}

      <div className={styles.container}>
        {/* トップ部分 */}
        <h1 className={styles.heading}>人生を変える一歩、あなたも踏み出しませんか？</h1>
          <p className={styles.subtext}>
            仕事や人間関係、介護によるストレスやメンタルの悩みで立ち止まっている方へ。<br />
            長く抱えてきた「生きにくさ」や心の負担から抜け出し、新しい自分を見つける時です。<br />
            あなたの一歩が、確かな変化に繋がります。<br />
            私と一緒に、その一歩を踏み出しましょう！
          </p>


        {/* 画像とプロフィールを横並びに配置 */}
        <div className={styles.profileContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/me.png" // publicフォルダに自分の写真を置く
              alt="Your Photo"
              width={300}
              height={300}
              className={styles.photo}
            />
            <div className={styles.profileText}>
            <div>
            Nくん|心理カウンセラー
            </div>
            </div>
          </div>
          <div className={styles.profileText}>
            <ul>
              <li>・40代 男</li>
              <li>・好きなこと・・・音楽、グルメ、温泉、バスケ</li>
            </ul>
            <br />
            <strong>（強み）</strong>
            <ul>
              <li>・うつ病経験を活かした心のケア、社会復帰支援</li>
              <li>・介護現場での経験を基に、介護に苦しむ人の心のケアとサポート</li>
            </ul>
          </div>
        </div>

        {/* SNSリンク */}
        {/* <div className={styles.sns}>
          <a href="https://x.com/N6209316426525" target="_blank" rel="noopener noreferrer">
            <Image src="/x.png" alt="x" width={40} height={40} />
            　⇦Xはこちらから
          </a>
        </div> */}

        {/* 内部リンクへの改善 */}
        {/* <div className={styles.linkSection}>
          <Link href="/posts"  legacyBehavior>
            <a className={styles.link}>・コラム一覧を見る</a>
          </Link>
        </div> */}
    <div className={styles.container}>
      {/* お知らせセクション */}
      <div className={styles.notifications}>
        <h2 className={styles.notificationsHeading}>記事更新</h2>
        <ul className={styles.notificationList}>
        {safeNotifications.length > 0 ? (
              safeNotifications.map((note, index) => (
              <li key={index} className={styles.notificationItem}>
                <span className={styles.notificationDate}>{note.date}</span>
                <Link href={`/posts/${note.slug}`} legacyBehavior>
                  <a className={styles.notificationTitle}>{note.title}</a>
                </Link>
              </li>
            ))
          ) : (
            <p>現在お知らせはありません。</p>
          )}
        </ul>
        {safeNotifications.length > 0 && (
          <div className={styles.notificationMore}>
            <Link href="/posts" legacyBehavior>
              <a>過去の記事一覧はこちら &raquo;</a>
            </Link>
          </div>
        )}
      </div>
    </div>

        {/* 行動の促し */}
        <div className={styles.actionBlock}>
          <button className={styles.counselingButton} onClick={() => alert('カウンセリング予約ページへ移動')}>
                カウンセリングの説明（※準備中）
          </button>
        </div>

        {/* コピーライティングとカウンセリングに関する内容 */}
        <div className={styles.content}>

          {/* 「もう一人で抱え込まないでください」セクション */}
          <div className={styles.banner}>
            <h2 className={styles.bannerText}>自分ひとりで悩まないでください</h2>
          </div>

          {/* 導入部分 */}
          <div className={styles.introduction}>
          <p>
            　仕事のストレス、介護の疲れ、人間関係の行き詰まり、そして心の疲労。<br />
            　「どうせ自分なんて…」と感じ、立ち止まってしまっていませんか？<br /><br />
            　そんな時こそ、少しだけ勇気を出して、心の重荷を軽くする一歩を踏み出しましょう。<br />
            　あなたが前に進むための具体的なサポートを、カウンセリングやライフコーチングを通じてお届けします。<br />
            　もう一度、笑顔を取り戻すためのその一歩を、私と一緒に踏み出しませんか？
          </p>
          </div>

          {/* 現実の問題点と自分のエピソードを一つのブロックにまとめる */}
          <div className={styles.problemContainer}>
            {/* 現実の問題点の強調帯 */}
            <div className={styles.problemBanner}>
              <h2 className={styles.bannerText}>現実の問題はもっと深刻</h2>
            </div>

            {/* 問題点のカードリスト */}
            <div className={styles.problemBlock}>
              <ul className={styles.cardList}>
              <li className={styles.card}>
                家族や友人に理解されず、孤独感が強い
              </li>
              <li className={styles.card}>
                うつや抑うつ状態で、気力が湧かない、何をすればいいのかわからない
              </li>
              <li className={styles.card}>
                介護のストレスが大きく、心のケアが必要だと感じている
              </li>
              <li className={styles.card}>
                仕事や新しい挑戦に自信が持てず、一歩を踏み出せない
              </li>
              <li className={styles.card}>
                自己否定が強く、自分を無価値に感じてしまう
              </li>
              <li className={styles.card}>
                社会との関わりが希薄で、どう行動すればいいか迷っている
              </li>
              <li className={styles.card}>
                将来に対する不安があり、具体的な行動を決められない
              </li>

              </ul>
            </div>

            {/* 自分のエピソード */}
            <div className={styles.storyBlock}>
            <p>
              　私自身、<u>過去、うつ病と戦いました</u>。<br /><br />
              　社会復帰は決して簡単ではなく、むしろ厳しいものでした。何度も壁にぶつかり、挫折や失敗を経験し、進むことすら辛いと感じる日々もありました。<br />
              　それでも、一歩ずつ前に進む努力を続け、少しずつ壁を乗り越えてきました。<br /><br />
              　過去には介護の仕事にも従事し、心身ともに厳しい環境の中で、介護の大変さや心の負担を強く実感しました。<br />
              　何かしら特別な救いがあったわけではありませんが、挑戦を続ける中で少しずつ自分自身の問題を解決していきました。<br /><br />
              　あなたも同じように、少しずつ前に進むことができます。一緒に歩んでいきましょう。
            </p>

            </div>
          </div>

          {/* カウンセリングで何が解決できる？ */}
          <div className={styles.solutionContainer}>
            <div className={styles.solutionBanner}>
              <h2 className={styles.bannerText}>私がサポートできること</h2>
            </div>

            {/* サポートのリスト */}
            <div className={styles.problemBlock}>
              <ul className={styles.cardList}>
                <li className={styles.card}>
                <strong>心の健康と自己肯定感の回復支援</strong>: 自分を大切にしながら、一歩ずつ前に進むための方法を提案します。自己肯定感を高め、新たな人生のスタートを支援します。
                </li>
                <li className={styles.card}>
                  <strong>介護に苦しむ人へのサポート</strong>: 介護のストレスや家族との関係に悩む方へ、現実的なアドバイスと心のケアを提供します。特に介護者の心の負担に寄り添います。
                </li>
                <li className={styles.card}>
                <strong>年代や性別を問わない支援</strong>: 若者をから、さまざまな年代の方に対応した支援を提供します。生きにくさを感じる方々に対して、無理なく前向きに進むための具体的なサポートを行います。
                </li>
                <li className={styles.card}>
                <strong>新しいステップへのサポート</strong>: 新しい一歩を踏み出し、社会や人間関係の中で充実した生活を再構築する手助けをします。
                </li>
              </ul>
            </div>

          </div>

          {/* カウンセリング対象 */}
          <div className={styles.targetContainer}>
            <div className={styles.targetBanner}>
              <h2 className={styles.bannerText}>年代、性別問わずどんな方でも大丈夫です</h2>
            </div>
            <div className={styles.targetBlock}>
              <p>
                うつ病や生きにくさに悩む方だけでなく、介護の悩みや社会復帰、人間関係の構築に困難を感じている方も対象です。悩みの大きさに関わらず、まずは話してみませんか？
              </p>
              <ul className={styles.cardList}>
              <li className={styles.card}>
                うつ病や抑うつ感から抜け出そうとしても、次の一歩が踏み出せない方
              </li>
              <li className={styles.card}>
                介護に関する悩みを抱え、心の負担が大きくなっている方
              </li>
              <li className={styles.card}>
                新しい人間関係を築くことに不安を感じ、どう行動していいかわからない方
              </li>
              <li className={styles.card}>
                社会の中で孤独感を抱え、周囲との繋がりが見つからない方
              </li>
              <li className={styles.card}>
                自分を否定する気持ちが強く、自己肯定感を少しずつ取り戻したい方
              </li>
              <li className={styles.card}>
                目の前の問題に対してどう行動すべきか悩み、具体的な行動のステップが見えない方
              </li>

              </ul>
            </div>
          </div>

          {/* 行動の促し */}
          <div className={styles.actionContainer}>
            <div className={styles.actionBanner}>
              <h2 className={styles.bannerText}>お気軽にご相談ください</h2>
            </div>
            <div className={styles.actionBlock}>
              <p>人生の一歩を踏み出すために、まずは話してみましょう。</p>
              <button className={styles.counselingButton} onClick={() => alert('カウンセリング予約ページへ移動')}>
                カウンセリングの説明（※準備中）
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
