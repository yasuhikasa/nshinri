import Image from 'next/image';
import Head from 'next/head';
import styles from './index.module.css'; // CSSモジュールをインポート
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      {/* SEOとメタ情報のためのHeadタグ */}
      <Head>
        <title>心理カウンセリングとライフコーチング - Nくん</title>
        <meta name="description" content="Nくんの心理カウンセリングとライフコーチングサービス。うつ病や生きにくさ、社会復帰のサポートを提供します。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="心理カウンセリングとライフコーチング - Nくん" />
        <meta property="og:description" content="生きにくさに寄り添い、社会復帰や自己肯定感の回復をサポートします。" />
        <meta property="og:image" content="/me.png" />
        <meta property="og:url" content="https://nshinri.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="心理カウンセリングとライフコーチング - Nくん" />
        <meta name="twitter:description" content="生きにくさに寄り添い、自己肯定感を回復するライフコーチング。" />
        <meta name="twitter:image" content="/x.png" />
        <meta name="google-site-verification" content="qhPi1I958aMX4JB4OO-vT4w_m1ls0YdUOTaq-GmhxdE" />

      </Head>

      <Header /> {/* ヘッダーを表示 */}

      <div className={styles.container}>
        {/* トップ部分 */}
        <h1 className={styles.heading}>人生を変える一歩、あなたも踏み出しませんか？</h1>
        <p className={styles.subtext}>
          仕事や人間関係に悩み、孤独や社会復帰への不安を抱えているあなたへ。<br />
          長い間、苦しんできた「生きにくさ」から、今こそ抜け出す時です。<br />
          私と一緒に、その壁を一つずつ乗り越え、<strong>新しい自分</strong>を見つけてみませんか？<br />
          どんなに小さな一歩でも、その一歩が大きな変化に繋がります。
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
          </div>
          <div className={styles.profileText}>
            <ul>
              <li>・Nくん|心理カウンセラー</li><br />
              <li>・43才 男</li>
              <li>・独身 東京在住</li>
              <li>・大学院卒（法学）</li>
              <li>・好きなこと・・・音楽、グルメ、温泉、バスケ</li>
              <li>・過去、うつ病に苦しみながらも社会復帰を果たす</li>
            </ul>
          </div>
        </div>

        <div className={styles.sns}>
          <a href="https://x.com/N6209316426525" target="_blank" rel="noopener noreferrer">
            <Image
              src="/x.png"
              alt="x"
              width={40}
              height={40}
            />
            　⇦Xはこちらから
          </a>
        </div>

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
              「どうせ自分なんて」と感じたり、失敗の恐怖に押しつぶされそうになっていませんか？毎朝起きるたびに、「どうして自分はこんなに苦しいんだろう」と思い悩んでいる方へ。<br /><br />
              カウンセリングやライフコーチングは、そんなあなたの心に寄り添い、少しずつ前に進むためのサポートを提供します。<br />
              小さな一歩を踏み出すことで、大きな変化が生まれるかもしれません。
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
              <p className={styles.introduction}>
                私も同じように感じていました。<u>29歳から36歳まで、うつ病と戦い</u>、社会復帰に悩みました。病気を抱えながら仕事を探したり、働けど失敗の連続、
                人間関係の再構築がうまくできず、何度も挫折を経験しました。自己肯定感ゼロの状態で24時間365日を過ごしていました。<br /><br />
                それでも少しずつ前に進む方法を見つけ、今では他の方のサポートをすることができています。あなたも同じように、一歩ずつ進んでいけるはずです。
              </p>
            </div>
          </div>

          {/* カウンセリングで何が解決できる？ */}
          <div className={styles.solutionContainer}>
            <div className={styles.solutionBanner}>
              <h2 className={styles.bannerText}>カウンセリングで何が解決できる？</h2>
            </div>
            <div className={styles.solutionBlock}>
              <ul className={styles.cardList}>
                <li className={styles.card}>
                  <strong>孤独感からの解放</strong>: 誰にも話せない悩みを、安心して話せる場所を提供します。
                </li>
                <li className={styles.card}>
                  <strong>感情の整理</strong>: 心の中で絡み合っている感情を整理し、心を軽くするサポートをします。
                </li>
                <li className={styles.card}>
                  <strong>自己肯定感の回復</strong>: 自己否定から解放され、自己肯定感を少しずつ取り戻すお手伝いをします。
                </li>
                <li className={styles.card}>
                  <strong>新しいステップへのサポート</strong>: 新しい一歩を踏み出し、充実した生活や人間関係の再構築を目指します。
                </li>
                <li className={styles.card}>
                  <strong>人間関係の改善</strong>: 対人関係の悩みを整理し、コミュニケーションのスキル向上を目指します。
                </li>
                <li className={styles.card}>
                  <strong>未来に向けたビジョンづくり</strong>: 自分の人生に対する新しい視点や可能性を見つけ、将来のビジョンを明確にします。
                </li>
              </ul>
            </div>
          </div>


          {/* カウンセリング対象 */}
          <div className={styles.targetContainer}>
            <div className={styles.targetBanner}>
              <h2 className={styles.bannerText}>どんな方でも大丈夫です</h2>
            </div>
            <div className={styles.targetBlock}>
              <p>
                うつ病や生きにくさに悩む方だけでなく、社会復帰や人間関係の構築に困難を感じている方も対象です。悩みの大きさに関わらず、まずは話してみませんか？
              </p>
              <ul className={styles.cardList}>
              <li className={styles.card}>
                うつ病や抑うつ感から抜け出そうとしても、次の一歩が踏み出せない方
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
