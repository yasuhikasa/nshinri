import Image from 'next/image';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './aboutme.module.css'; // CSSモジュールをインポート
import { NextSeo } from 'next-seo';
import Breadcrumb from '../../components/Breadcrumb';

// 構造化データのJSON-LD形式
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '私について',
  url: 'https://nshinri.net/aboutme',
  publisher: {
    '@type': 'Organization',
    name: '私について',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nshinri.net/me.png',
      width: 300,
      height: 300,
    },
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '私について',
  provider: {
    '@type': 'Person',
    name: 'Nくん',
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
        title="Nくん私について"
        description="ITエンジニア業、Kindle出版などの情報を発信しています。"
        canonical="https://nshinri.net/aboutme"
        openGraph={{
          title: 'Nくん私について',
          description: 'ITエンジニア業、Kindle出版などの情報を発信しています。',
          url: 'https://nshinri.net/aboutme',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: 'ITエンジニアのOGP画像',
            },
          ],
          site_name: 'Nくん私について',
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
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />
        </Head>
      </Head>
      <Header /> {/* ヘッダーを表示 */}
      <div className={styles.container}>
        <Breadcrumb />
        {/* トップ部分 */}
        <h1 className={styles.heading}>日笠泰彰について</h1>

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
              <div>Nくん</div>
            </div>
          </div>
          <div>
            <div className={styles.profileText}>
              <ul>
                <li>・40代 男</li>
                <li>・好きなこと・・・音楽、グルメ、温泉、バスケ</li>
              </ul>
              <br />
            </div>
            <div className={styles.actionBlock}>
              20代弁護士を志すも、あと一歩のところで挫折。その後、30代は音楽クリエイターとして活動、その後介護職に従事する。
              40歳未経験でITエンジニアに転職。
              {/* ITエンジニアとして働きながら、過去の苦い経験や社会復帰の経験を活かし、カウンセリング、ライフコーチングなどの活動を行っている。 */}
            </div>
            {/* SNSリンク */}
            <div className={styles.sns}>
              <a
                href="https://x.com/N6209316426525"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/x.png" alt="x" width={60} height={60} />
                　⇦Xはこちらから
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutme;
