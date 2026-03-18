import Image from 'next/image';
import Head from 'next/head';
import styles from './counseling.module.css'; // CSSモジュールをインポート
import Header from '../../components/counselingHeader';
import { NextSeo } from 'next-seo';
import Breadcrumb from '../../components/Breadcrumb';
import { useRouter } from 'next/router';

// 構造化データのJSON-LD形式
const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'ライフカウンセリング・キャリア相談 - 日笠泰彰',
  url: 'https://nshinri.net/counseling',
  about: {
    '@type': 'Thing',
    name: 'ライフカウンセリング・キャリア相談',
  },
  publisher: {
    '@type': 'Person',
    name: '日笠泰彰',
  },
  mainEntity: {
    '@type': 'Service',
    name: 'ライフカウンセリング・キャリア相談',
    description:
      '30代・40代のキャリアリスタート、人生の悩み、メンタルケアをサポートします。',
    provider: {
      '@type': 'Person',
      name: '日笠泰彰',
    },
  },
};

const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'ライフカウンセリング・キャリア相談',
  description:
    'IT転職・フリーランス移行・キャリアリスタートに関する相談を提供するオンラインサービス。',
  provider: {
    '@type': 'Person',
    name: '日笠泰彰',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '日本',
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceLocation: {
      '@type': 'Place',
      name: 'オンライン（Google Meet）',
    },
  },
  category: 'キャリア相談・ライフカウンセリング',
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
      name: 'ライフカウンセリング・キャリア相談',
      item: 'https://nshinri.net/counseling',
    },
  ],
};

const Counseling = () => {
  const router = useRouter();
  return (
    <>
      {/* NextSeoを使ったSEO設定 */}
      <NextSeo
        title="ライフカウンセリング・キャリア相談 - 日笠泰彰"
        description="30代・40代のキャリアリスタート、人生の悩み、メンタルケアをサポートします。"
        canonical="https://nshinri.net/counseling"
        openGraph={{
          title: 'ライフカウンセリング・キャリア相談 - 日笠泰彰',
          description:
            'キャリアリスタート・人生の方向性・メンタルケアに関する相談サービス。',
          url: 'https://nshinri.net/counseling',
          images: [
            {
              url: 'https://nshinri.net/4.jpg',
              width: 1200,
              height: 630,
              alt: '日笠泰彰によるライフカウンセリング・キャリア相談のOGP画像',
            },
          ],
          site_name: 'ライフカウンセリング・キャリア相談 - 日笠泰彰',
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
          キャリアと人生のリスタートを一緒に考えませんか？
        </h1>
        <p className={styles.subtext}>
          仕事や人生の方向性に悩んでいる方へ。
          <br />
          IT転職、人生のリスタート、メンタルケアなど、30代・40代からのキャリア再構築をサポートします。
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
              <div>
                日笠泰彰|ITエンジニア　兼　ＪＡＤＰ認定メンタル心理カウンセラー
              </div>
            </div>
          </div>
          <div className={styles.profileText}>
            <ul>
              <li>・40代 男</li>
              <li>・好きなこと・・・音楽、グルメ、温泉、バスケ</li>
            </ul>
            <br />
            <strong>（強み：実体験に基づいたサポート）</strong>
            <ul>
              <li>・未経験からITエンジニア転職を叶えた実体験</li>
              <li>・人生をリスタートするにあたってのキャリアアドバイス</li>
              <li>・仕事のストレスやメンタルケアを意識した支援</li>
            </ul>
          </div>
        </div>

        {/* 行動の促し */}
        <div className={styles.actionBlock}>
          <button
            className={styles.counselingButton}
            onClick={() => router.push('/booking')}
          >
            カウンセリングの予約
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
              仕事やキャリアの行き詰まり、将来の不安、人生のリスタートに関する悩み。
              <br />
              そんなモヤモヤを抱えたまま立ち止まっていませんか？
              <br />
              私は、あなたが次の一歩を踏み出せるよう伴走したいと考えています。
              <br />
              まずは気軽にお話しください。
            </p>
          </div>

          {/* 現実の問題点と自分のエピソードを一つのブロックにまとめる */}
          <div className={styles.problemContainer}>
            {/* 現実の問題点の強調帯 */}
            <div className={styles.problemBanner}>
              <h2 className={styles.bannerText}>
                こんな悩み、抱えていませんか？
              </h2>
            </div>

            {/* 問題点のカードリスト */}
            <div className={styles.problemBlock}>
              <ul className={styles.cardList}>
                <li className={styles.card}>
                  キャリアチェンジを考えているが、何から始めればいいかわからない
                </li>
                <li className={styles.card}>
                  30代・40代で転職やリスタートを考えているが不安が大きい
                </li>
                <li className={styles.card}>
                  仕事のストレスや将来の見通しがつかず、漠然とした不安を抱えている
                </li>
                <li className={styles.card}>
                  今の仕事にやりがいを感じられず、次のステップを考えたい
                </li>
                <li className={styles.card}>
                  自己肯定感が低く、自信を持って行動できない
                </li>
                <li className={styles.card}>
                  仕事や新しい挑戦に自信が持てない
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
                　私自身、<u>過去、大きな挫折を経験しました</u>。<br />
                　キャリアの悩みや人生の方向性について何度も考えてきました。
                <br />
                　人生のリスタートは決して簡単ではなく、むしろ厳しいものでした。何度も壁にぶつかり、挫折や失敗を経験し、進むことすら辛いと感じる日々もありました。
                <br />
                　それでも、一歩ずつ前に進む努力を続け、少しずつ壁を乗り越えてきました。
                <br />
                <br />
                　何かしら特別な救いがあったわけではありませんが、挑戦を続ける中で少しずつ自分自身の問題を解決していきました。
                <br />
                <br />
                　どんな道を選ぶにしても、一歩ずつ進んでいくことで未来は変えられます。
                <br />
                <br />
                　あなたが「次の一歩」を踏み出せるよう、経験に基づいたサポートを提供します。
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
                  <strong>キャリア転職・ITフリーランス支援</strong>:
                  未経験からのIT転職、フリーランスとしての独立を成功させるための実践的なアドバイスを提供。
                </li>
                <li className={styles.card}>
                  <strong>仕事のストレス管理・不安の軽減</strong>:
                  キャリアの方向性を整理し、ストレスの管理や仕事との向き合い方をアドバイス。
                </li>
                <li className={styles.card}>
                  <strong>自己肯定感の向上と行動のサポート</strong>:
                  自分の強みを見つけ、自信を持って次のステップに進めるよう支援。
                </li>
                <li className={styles.card}>
                  <strong>人生のリスタートプラン</strong>:
                  転職や独立に限らず、自分に合った生き方を見つけるための伴走。
                </li>
                {/* <li className={styles.card}>
                  <strong>副業・独立のスタートアップ相談</strong>:
                  フリーランスや副業を始める際の計画作成や収益化のアドバイス。
                </li> */}
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
                onClick={() => router.push('/booking')}
              >
                カウンセリングの予約
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counseling;
