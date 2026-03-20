import Image from 'next/image';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './aboutme.module.css'; // CSSモジュールをインポート
import { NextSeo } from 'next-seo';
import Breadcrumb from '../../components/Breadcrumb';

// 構造化データのJSON-LD形式
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: '日笠泰彰について',
  url: 'https://nshinri.net/aboutme',
  mainEntity: {
    '@type': 'Person',
    name: '日笠泰彰',
    url: 'https://nshinri.net/aboutme',
    image: 'https://nshinri.net/me.png',
    jobTitle: 'ITエンジニア・心理カウンセラー',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '私について',
  provider: {
    '@type': 'Person',
    name: '日笠泰彰',
  },
  areaServed: 'Japan',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceLocation: {
      '@type': 'Place',
      name: 'オンライン',
    },
  },
  category: '私について',
  url: 'https://nshinri.net/aboutme',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://nshinri.net/aboutme',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '私について',
      item: 'https://nshinri.net/aboutme',
    },
  ],
};

const Aboutme = () => {
  return (
    <>
      {/* NextSeoを使ったSEO設定 */}
      <NextSeo
        title="日笠泰彰について | ITエンジニア・心理カウンセラー"
        description="日笠泰彰のプロフィールページ。40歳未経験からITエンジニアへ転職した経歴や、個人開発、キャリア相談・ライフコーチングの活動内容を紹介しています。"
        canonical="https://nshinri.net/aboutme"
        openGraph={{
          title: '日笠泰彰について | ITエンジニア・心理カウンセラー',
          description:
            '日笠泰彰のプロフィールページ。経歴、活動領域、発信内容をわかりやすく紹介します。',
          url: 'https://nshinri.net/aboutme',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: '日笠泰彰のプロフィール画像',
            },
          ],
          site_name: "N's WorkRoom",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      </Head>
      <Header /> {/* ヘッダーを表示 */}
      <div className={styles.container}>
        <Breadcrumb />
        {/* トップ部分 */}
        <h1 className={styles.heading}>私について</h1>

        {/* 画像とプロフィールを横並びに配置 */}
        <div className={styles.profileContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/me.png" // publicフォルダに自分の写真を置く
              alt="日笠泰彰のプロフィール写真"
              width={300}
              height={300}
              className={styles.photo}
            />
            <div className={styles.profileText}>
              <div className={styles.name}>Nくん</div>
              <p className={styles.role}>ITエンジニア・心理カウンセラー</p>
            </div>
          </div>
          <div className={styles.profileRight}>
            <div className={styles.profileText}>
              <ul>
                <li>・40代 男</li>
                <li>・好きなこと・・・音楽、グルメ、温泉、バスケ</li>
              </ul>
            </div>
            <div className={styles.actionBlock}>
              20代弁護士を志すも、あと一歩のところで挫折。その後、30代は音楽クリエイターとして活動、その後介護職に従事する。
              40歳未経験でITエンジニアに転職。
              {/* ITエンジニアとして働きながら、過去の苦い経験や社会復帰の経験を活かし、カウンセリング、ライフコーチングなどの活動を行っている。 */}
            </div>
            {/* SNSリンク */}
            {/* <div className={styles.sns}>
              <a
                href="https://x.com/N6209316426525"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/x.png" alt="x" width={60} height={60} />
                　⇦Xはこちらから
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutme;
