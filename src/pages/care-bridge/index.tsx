import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './careBridge.module.css';

const canonical = 'https://nshinri.net/care-bridge';
const pageTitle = 'CareBridge | 介護のバトンタッチをスムーズにする記録・共有アプリ';
const pageDescription =
  'CareBridge は、自宅での介護記録をつけてPDFで共有し、家族・施設・ケアマネとの連携をスムーズにするiOSアプリです。記録を「溜める」だけでなく「伝わる形」にして、より良いケアにつなげます。';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://nshinri.net/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'CareBridge',
      item: canonical,
    },
  ],
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'CareBridge',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS',
  description: pageDescription,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    price: '0',
    priceCurrency: 'JPY',
  },
};

const problems = [
  '家族内の「申し送り」が口頭・メモ・LINEに散らばって、あとから追えない',
  '施設やケアマネに伝える内容が毎回バラバラで、状況が正確に伝わりにくい',
  '記録しても「共有」が大変で、結局つけなくなる',
  'ケアの判断材料が残らず、良いケアプランの話し合いにつながりにくい',
];

const valueProps = [
  {
    title: '記録を、共有できる形に',
    text: 'CareBridge は「記録アプリ」ではなく、介護のバトンタッチをスムーズにする“架け橋ツール”。記録をPDFにまとめて、家族・施設・ケアマネに渡しやすくします。',
  },
  {
    title: '伝わるから、相談が前に進む',
    text: '体調の変化や服薬、食事、睡眠などの記録がまとまると、「何が起きているか」が共有しやすくなります。結果として、相談やケアプランの改善につながりやすくなります。',
  },
  {
    title: '自宅介護の“続けられる”を優先',
    text: '複雑な操作より、まずは日々の記録を積み上げられること。スマホ・タブレットの両方で使える前提で、続けやすさを重視します。',
  },
];

const screenshots = [
  {
    src: '/11.png',
    alt: 'CareBridge のスクリーンショット（記録のイメージ）',
  },
  {
    src: '/12.png',
    alt: 'CareBridge のスクリーンショット（一覧のイメージ）',
  },
  {
    src: '/13.png',
    alt: 'CareBridge のスクリーンショット（共有・出力のイメージ）',
  },
  {
    src: '/14.png',
    alt: 'CareBridge のスクリーンショット（利用シーンのイメージ）',
  },
];

const faq = [
  {
    q: '誰向けのアプリですか？',
    a: '自宅で介護をしているご家族、家族間で介護を分担している方、施設・ケアマネに状況を共有したい方を想定しています。',
  },
  {
    q: 'できることは何ですか？',
    a: '介護の記録を残し、状況をPDFにまとめて共有できるようにすることを軸にしています。細かい機能より「伝わる形にする」ことを優先しています。',
  },
  {
    q: '対応端末は？',
    a: 'iOS（iPhone / iPad）向けです。App Store 限定で提供します。',
  },
];

export default function CareBridgePage() {
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(
    null
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonical,
          type: 'website',
          images: [{ url: 'https://nshinri.net/15.png' }],
          site_name: "N's WorkRoom",
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
      </Head>

      <Header />

      <main className={styles.page}>
        <div className={styles.container}>
          <Breadcrumb currentLabel="CareBridge" />

          <section className={styles.hero} aria-labelledby="carebridge-hero">
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <p className={styles.badge}>iOS / App Store 限定</p>
                <h1 id="carebridge-hero" className={styles.heroTitle}>
                  介護のバトンタッチをスムーズにする
                  <br />
                  家族と施設の“架け橋”ツール
                </h1>
                <p className={styles.heroLead}>{pageDescription}</p>

                <div className={styles.heroCtas}>
                  <a
                    href="https://apps.apple.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryCta}
                    aria-label="App Store で CareBridge を見る（新しいタブで開きます）"
                  >
                    <span className={styles.appleMark} aria-hidden="true">
                      
                    </span>
                    App Storeで見る
                  </a>
                  <Link href="/contact" className={styles.secondaryCta}>
                    導入や相談を問い合わせる
                  </Link>
                </div>

                <ul className={styles.heroBullets}>
                  <li>記録 → PDF化 → 共有までをひとつの流れに</li>
                  <li>家族・施設・ケアマネと状況を揃える</li>
                  <li>スマホ / タブレット対応（iPhone / iPad）</li>
                </ul>
              </div>

              <div className={styles.heroMedia} aria-label="CareBridgeアプリのイメージ">
                <div className={styles.phoneFrame}>
                  <Image
                    src="/15.png"
                    alt="CareBridge アプリアイコン"
                    width={96}
                    height={96}
                    className={styles.appIcon}
                    priority
                  />
                  <p className={styles.appName}>CareBridge</p>
                  <p className={styles.appTagline}>
                    記録と共有で、ケアを前に進める
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.problem} aria-labelledby="carebridge-problem">
            <h2 id="carebridge-problem" className={styles.sectionTitle}>
              よくある困りごと
            </h2>
            <p className={`${styles.sectionLead} ${styles.sectionLeadNoWrap}`}>
              介護は「やること」だけでなく「伝えること」も増えがちです。CareBridge
              は、共有の負担を減らすことから始めます。
            </p>
            <ul className={styles.problemGrid}>
              {problems.map((text) => (
                <li key={text} className={styles.problemCard}>
                  <span className={styles.problemMark} aria-hidden="true">
                    !
                  </span>
                  <p className={styles.problemText}>{text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.value} aria-labelledby="carebridge-value">
            <h2 id="carebridge-value" className={styles.sectionTitle}>
              CareBridge が目指すこと
            </h2>
            <div className={styles.valueGrid}>
              {valueProps.map((item) => (
                <article key={item.title} className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{item.title}</h3>
                  <p className={styles.valueText}>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.screens} aria-labelledby="carebridge-screens">
            <h2 id="carebridge-screens" className={styles.sectionTitle}>
              画面イメージ（4枚）
            </h2>
            <p className={`${styles.sectionLead} ${styles.sectionLeadNoWrap}`}>
              左から順に・PDFイメージ・一覧画面（グラフ部分）・アプリコンセプト・食事量の入力画面
            </p>
            <div className={styles.screenshotGrid}>
              {screenshots.map((shot) => (
                <button
                  key={shot.src}
                  type="button"
                  className={styles.screenshotCard}
                  onClick={() => setLightbox({ src: shot.src, alt: shot.alt })}
                >
                  <div className={styles.screenshotMedia}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.screenshotImg}
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.faq} aria-labelledby="carebridge-faq">
            <h2 id="carebridge-faq" className={styles.sectionTitle}>
              よくある質問
            </h2>
            <div className={styles.faqList}>
              {faq.map((item) => (
                <div key={item.q} className={styles.faqItem} role="group">
                  <h3 className={styles.faqQ}>{item.q}</h3>
                  <p className={styles.faqA}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.cta} aria-labelledby="carebridge-cta">
            <div className={styles.ctaCard}>
              <h2 id="carebridge-cta" className={styles.ctaTitle}>
                CareBridge を試してみたい方へ
              </h2>
              <p className={styles.ctaText}>
                App Store 限定で提供します。導入の相談や「こういう共有がしたい」といった要望も、お問い合わせからお送りください。
              </p>
              <div className={styles.ctaButtons}>
                <a
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryCta}
                >
                  App Storeで見る
                </a>
                <Link href="/contact" className={styles.blueCta}>
                  お問い合わせ
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {lightbox && (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="画像の拡大表示"
          onClick={() => setLightbox(null)}
        >
          <div
            className={styles.lightboxPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="閉じる"
            >
              ×
            </button>
            <div className={styles.lightboxMedia}>
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="100vw"
                className={styles.lightboxImg}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
