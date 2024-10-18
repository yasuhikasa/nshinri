import Image from 'next/image';
import Head from 'next/head'; // ヘッダー情報を追加するためのコンポーネント
import styles from './index.module.css'; // スタイルのためのCSSモジュールを追加
import Header from '../components/Header';

const Home = () => {
  return (
    <>
    {/* SEOとメタ情報のためのHeadタグ */}
    <Head>
    <title>心理カウンセリング - Nくん</title>
    <meta name="description" content="Nくんの心理カウンセリングサービス。安心して相談できる場所をご提供します。鬱病やストレス、自己肯定感の低下など、幅広いお悩みに対応しています。" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="心理カウンセリング - Nくん" />
    <meta property="og:description" content="Nくんの心理カウンセリングサービス。あなたの心に寄り添い、サポートを提供します。" />
    <meta property="og:image" content="/me.png" />
    <meta property="og:url" content="https://yourwebsite.com" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="心理カウンセリング - Nくん" />
    <meta name="twitter:description" content="安心して相談できる心理カウンセリングを提供します。" />
    <meta name="twitter:image" content="/path-to-your-image.jpg" />
  </Head>
    <Header /> {/* ヘッダーを表示 */}
    <div className={styles.container}>
      {/* トップ部分 */}
      <h1 className={styles.heading}>ゆっくりとしたペースで、心に寄り添います</h1>
      <p className={styles.subtext}>
        あなたの心の声に耳を傾け、一緒に進んでいくお手伝いをします。
        安心して話せる場所がここにあります。
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
            <li>・好きなこと・・・音楽（セカオワやミセスとか）、グルメ、温泉、バスケ</li>
          </ul>
        </div>
      </div>
      <div className={styles.sns}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/twitter.png"
            alt="Twitter"
            width={30}
            height={30}
          />
        </a>
      </div>
      <div className={styles.actionBlock}>
            <button className={styles.counselingButton} onClick={() => alert('カウンセリング予約ページへ移動')}>
              カウンセリングを受ける（※準備中）
            </button>
          </div>

      {/* コピーライティングとカウンセリングに関する内容 */}
      <div className={styles.content}>
        {/* 「もう一人で抱え込まないでください」セクション */}
      <div className={styles.banner}>
        <h2 className={styles.bannerText}>もう一人で抱え込まないでください。</h2>
      </div>

      {/* 導入部分 */}
      <div className={styles.introduction}>
        <p>
          家族や友人に悩みを話したいのに、「もっと頑張れ」「気にしすぎだよ」と言われるばかり。
          気づけば誰にも頼れなくなって、自分の殻に閉じこもってしまった。仕事も手につかず、
          周囲の目が気になって、毎日が息苦しい。夜になると、考えが止まらず、眠れない日々が続く。
        </p>
      </div>

      {/* 現実の問題点と自分のエピソードを一つのブロックにまとめる */}
      <div className={styles.problemContainer}>
        {/* 現実の問題点の強調帯 */}
        <div className={styles.problemBanner}>
          <h2 className={styles.bannerText}>現実の問題はもっと深刻。</h2>
        </div>

        {/* 問題点のカードリスト */}
        <div className={styles.problemBlock}>
          <ul className={styles.cardList}>
            <li className={styles.card}>
              家族の理解が得られない、友達も離れていった
            </li>
            <li className={styles.card}>
              仕事では上司や同僚に腫れ物扱いされ、自分の存在価値が揺らいでいる
            </li>
            <li className={styles.card}>
              心療内科やカウンセリングの予約はいっぱいで、今すぐ相談できる相手がいない
            </li>
            <li className={styles.card}>
              薬を飲み続けることが精神的に負担になっている
            </li>
            <li className={styles.card}>
              自己肯定感がどんどん低下して、自分が無価値に思えてしまう
            </li>
          </ul>
        </div>

        {/* 自分のエピソード */}
        <div className={styles.storyBlock}>
          <p className={styles.introduction}>
            私も同じような経験があります。<u>29歳から36歳まで、うつ病と戦い続けました</u>。
            入院こそはしませんでしたが、最初の1年間はほぼ寝たきりの状態。
            長く付き合いのあった友人からは「付き合う相手を選ばないとな」と縁を切られ、
            親にも「どうすればいいのかわからない」と言われ、相談してもいつも黙ったままでした。
          </p>
          <p className={styles.introduction}>
            30歳を超え、どうやって生きていけばいいのかわからなくなり、自分の人生に絶望したことを今でも覚えています。
          </p>
          <p className={styles.introduction}>
            その経験を通じて、心のケアの大切さを学びました。カウンセラーとして、あなたの心に寄り添い、サポートを提供したいと思っています。
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
              <strong>孤独感からの解放</strong>: 家族や友人に理解されない悩みを、安心して話せる場所を提供します。
            </li>
            <li className={styles.card}>
            <strong>感情の整理</strong>: 心の中で絡み合っている感情や思考を整理し、心を軽くするサポートをします。
            </li>
            <li className={styles.card}>
            <strong>自己肯定感の回復</strong>: 自己否定から解放され、自己肯定感を少しずつ取り戻すお手伝いをします。
            </li>
            <li className={styles.card}>
            <strong>一歩先に進むための手助け</strong>: あなたが今の状況から前に進むためのサポートをします。
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
            鬱病や精神的な悩みだけでなく、日常生活や人間関係に関する幅広い悩みに対応しています。
            ただし、薬の効果や医療に関する相談は専門の医師にご相談ください。
          </p>
          <ul className={styles.cardList}>
            <li className={styles.card}>
              鬱っぽいけれど、まだ診断は受けていない
            </li>
            <li className={styles.card}>
              職場でのストレスや人間関係に悩んでいる
            </li>
            <li className={styles.card}>
              恋愛や結婚について悩んでいる
            </li>
            <li className={styles.card}>
              家族との関係がうまくいかず、孤独を感じている
            </li>
            <li className={styles.card}>
              人生設計の道が見えず、迷っている
            </li>
            <li className={styles.card}>
              自己肯定感が低く、自分をもっと大切にしたい
            </li>
            <li className={styles.card}>
              年齢や性別に関係なく、誰でも相談や傾聴のサポートを受けられます
            </li>
          </ul>
        </div>
      </div>


        {/* 行動の促し */}
        <div className={styles.actionContainer}>
          <div className={styles.actionBanner}>
            <h2 className={styles.bannerText}>お気軽に相談してください</h2>
          </div>
          <div className={styles.actionBlock}>
            <p>一歩踏み出すことで、あなたの心は少しずつ軽くなります。まずは気軽にご相談ください。</p>
            <button className={styles.counselingButton} onClick={() => alert('カウンセリング予約ページへ移動')}>
              カウンセリングを受ける（※準備中）
            </button>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default Home;
