import Image from 'next/image';
import Head from 'next/head';
import styles from './counseling.module.css'; // CSSモジュールをインポート
import Header from '../../components/counselingHeader';
import { NextSeo } from 'next-seo';
import Breadcrumb from '../../components/Breadcrumb';

// 構造化データのJSON-LD形式
const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '心理カウンセリングとライフコーチング - Nくん',
  url: 'https://nshinri.net/counseling',
  about: {
    '@type': 'Thing',
    name: '心理カウンセリングサービス',
  },
  publisher: {
    '@type': 'Person',
    name: 'Nくん',
  },
  mainEntity: {
    '@type': 'Service',
    name: '心理カウンセリング',
    description:
      '生きにくさ、社会復帰、介護の悩みに具体的なサポートを提供します。',
    provider: {
      '@type': 'Person',
      name: 'Nくん',
    },
  },
};

const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '心理カウンセリング',
  description:
    '生きにくさや社会復帰、介護の悩みに寄り添い、具体的なサポートを提供するオンライン心理カウンセリングサービス。',
  provider: {
    '@type': 'Person',
    name: 'Nくん',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '日本',
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceLocation: {
      '@type': 'Place',
      name: 'オンライン',
    },
  },
  category: 'カウンセリングサービス',
  url: 'https://nshinri.net/counseling',
  offers: {
    '@type': 'Offer',
    price: '5000',
    priceCurrency: 'JPY',
    availability: 'https://schema.org/InStock',
  },
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://nshinri.net',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '心理カウンセリング',
      item: 'https://nshinri.net/counseling',
    },
  ],
};

const Counseling = () => {
  return (
    <>
      {/* NextSeoを使ったSEO設定 */}
      <NextSeo
        title="心理カウンセリングとライフコーチング - Nくん"
        description="うつ病や生きにくさ、社会復帰、介護の悩みに寄り添い、具体的なサポートを提供します。"
        canonical="https://nshinri.net/counseling"
        openGraph={{
          title: '心理カウンセリングとライフコーチング - Nくん',
          description:
            '生きにくさに寄り添い、社会復帰や自己肯定感の回復をサポートします。',
          url: 'https://nshinri.net/counseling',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: '心理カウンセリングとライフコーチングのOGP画像',
            },
          ],
          site_name: '心理カウンセリングとライフコーチング - Nくん',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdBreadcrumb),
            }}
          />
        </Head>
      </Head>
      <Header /> {/* ヘッダーを表示 */}
      <div className={styles.container}>
        <Breadcrumb />
        {/* トップ部分 */}
        <h1 className={styles.heading}>
          人生を変える一歩、あなたも踏み出しませんか？
        </h1>
        <p className={styles.subtext}>
          仕事や人間関係、介護によるストレスやメンタルの悩みで立ち止まっている方へ。
          <br />
          仕事、介護、転職、そして心の健康に悩む方が、一歩ずつ前進できるようサポートします。
        </p>

        {/* 画像とプロフィールを横並びに配置 */}
        <div className={styles.profileContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/me.png" // publicフォルダに自分の写真を置く
              alt="Your Photo"
              width={300}
              height={300}
              layout="intrinsic" // 画像のアスペクト比を維持
              className={styles.photo}
            />
            <div className={styles.profileText}>
              <div>Nくん|ＪＡＤＰ認定メンタル心理カウンセラー</div>
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
              <li>・自身の心の病の経験を活かした心のケア、社会復帰支援</li>
              <li>
                ・介護現場での経験を基に、介護に苦しむ人の心のケアとサポート
              </li>
              <li>
                ・IT未経験からエンジニア転職を叶えた実体験に基づく具体的なアドバイス
              </li>
            </ul>
          </div>
        </div>

        {/* 行動の促し */}
        <div className={styles.actionBlock}>
          <button
            className={styles.counselingButton}
            onClick={() => alert('カウンセリング予約ページへ移動')}
          >
            カウンセリングの説明（※準備中）
          </button>
        </div>

        {/* コピーライティングとカウンセリングに関する内容 */}
        <div className={styles.content}>
          {/* 「もう一人で抱え込まないでください」セクション */}
          <div className={styles.banner}>
            <h2 className={styles.bannerText}>
              自分ひとりで悩まないでください
            </h2>
          </div>

          {/* 導入部分 */}
          <div className={styles.introduction}>
            <p>
              　仕事のストレス、介護の疲れ、人間関係の行き詰まり、就職の悩み、そして心の疲労。
              <br />
              <br />
              　そんな時こそ、少しだけ勇気を出して、心の重荷を軽くする一歩を踏み出しましょう。
              <br />
              話すだけで気持ちが楽になることもあります。ぜひ一度、声を聞かせてください。
              <br />
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
                  うつや抑うつ状態で、気力が湧かない
                </li>
                <li className={styles.card}>
                  介護のストレスが大きく、心のケアが必要
                </li>
                <li className={styles.card}>
                  仕事や新しい挑戦に自信が持てない
                </li>
                <li className={styles.card}>
                  自己否定が強く、自分を無価値に感じてしまう
                </li>
                <li className={styles.card}>
                  社会との関わりが希薄で、行動がわからない
                </li>
                <li className={styles.card}>
                  将来への不安が行動を止めてしまう
                </li>
              </ul>
            </div>

            {/* 自分のエピソード */}
            <div className={styles.storyBlock}>
              <p>
                　私自身、<u>過去、心の病と戦いました</u>。<br />
                <br />
                　社会復帰は決して簡単ではなく、むしろ厳しいものでした。何度も壁にぶつかり、挫折や失敗を経験し、進むことすら辛いと感じる日々もありました。
                <br />
                　それでも、一歩ずつ前に進む努力を続け、少しずつ壁を乗り越えてきました。
                <br />
                <br />
                　過去には介護の仕事にも従事し、心身ともに厳しい環境の中で、介護の大変さや心の負担を強く実感しました。
                <br />
                　何かしら特別な救いがあったわけではありませんが、挑戦を続ける中で少しずつ自分自身の問題を解決していきました。
                <br />
                <br />
                　一歩ずつ進むことで、見える景色が変わることをお伝えしたいです。
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
                  <strong>心の健康と自己肯定感の回復支援</strong>:
                  自分を大切にしながら、前に進む力を取り戻すお手伝いをします。新たな人生のスタートを支援します。
                </li>
                <li className={styles.card}>
                  <strong>介護に苦しむ人へのサポート</strong>:
                  介護のストレスや家族との関係に悩む方へ、介護者の心の負担を軽減するアドバイスとケアを提供します。
                </li>
                <li className={styles.card}>
                  <strong>就職支援のキャリアコーチング</strong>:
                  40歳未経験でITエンジニアに転職した経験を活かし、自身の経験を活かし、転職への具体的な道筋をお伝えします。
                </li>
                <li className={styles.card}>
                  <strong>新しいステップへのサポート</strong>:
                  不安を整理し、行動に移せる具体的なプランを一緒に考えます。
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
              <button
                className={styles.counselingButton}
                onClick={() => alert('カウンセリング予約ページへ移動')}
              >
                カウンセリングの説明（※準備中）
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counseling;
