import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import { NextSeo } from 'next-seo';
import styles from './care-dx.module.css';

const canonical = 'https://nshinri.net/care-dx';
const pageTitle = '介護・福祉のDX相談 | 日笠泰彰';
const pageDescription =
  '介護福祉士の資格と現場経験、ITエンジニアの経験の両方から、介護・福祉のDX・記録・運用の課題を整理。日笠泰彰へのご相談はお問い合わせから。';

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
      name: '介護・福祉のDX相談',
      item: canonical,
    },
  ],
};

const problems = [
  'システムやツールは入れたのに、現場の実情と合わず、かえって負担が増えている',
  '記録・報告・申し送りが紙とデジタルで二重になり、誰が何を見ればいいかわからない',
  'IT担当（またはベンダー）と現場スタッフのあいだで言葉が通じず、議論が空転している',
  '「DXしろ」と言われたが、何から手をつければいいか、優先順位がつけられない',
];

const solutions = [
  {
    title: '課題を「現場の言葉」と「仕様・データの言葉」の両方で整理する',
    text: '帳票、記録、連絡フロー、利用者・家族対応など、現場で起きていることを丁寧に聞き取り、システムやツール側の制約・選択肢と突き合わせます。関係者が同じ図を見て話せる状態を目指します。',
  },
  {
    title: '無理のない運用から、小さく試して広げる道筋を一緒に描く',
    text: 'いきなり全面刷新にせず、入力負担・教育コスト・バックアップを見ながら、試せる単位で進め方を提案します。紙とデジタルの併用から始める選択肢も含めます。',
  },
  {
    title: '整理のあと、開発や連携が必要ならそのまま実装の相談につなげられる',
    text: '話し合いで見えてきた内容を、Webアプリ・フォーム・外部サービス連携など具体の形に落とし込む段階でも伴走できます。',
  },
];

export default function CareDxPage() {
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
          images: [{ url: 'https://nshinri.net/me.png' }],
          site_name: "N's WorkRoom",
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>
      <Header />
      <div className={styles.page}>
        <div className={styles.breadcrumbWrap}>
          <Breadcrumb currentLabel="介護・福祉のDX相談" />
        </div>

        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.badge}>Care × Tech</p>
            <h1 className={styles.heroTitle}>
              介護・福祉の現場とITの
              <br />
              「すれ違い」をほどく相談
            </h1>
            <p className={styles.heroLead}>
              施設・事業所、在宅、家族のサポートまで。記録や運用、システム導入のモヤモヤを、
              <strong>介護福祉士としての現場感覚</strong>と
              <strong>エンジニアとしての実装・整理力</strong>
              の両面から一緒に解いていきます。
            </p>
          </div>
        </header>

        <section
          className={`${styles.section} ${styles.problemBand}`}
          aria-labelledby="problems-heading"
        >
          <h2 id="problems-heading" className={styles.sectionTitle}>
            こんなことで困っていませんか？
          </h2>
          <p className={styles.sectionSubtitle}>
            どれか一つでも当てはまれば、その段階から相談いただいて大丈夫です。
          </p>
          <ul className={styles.problemList}>
            {problems.map((text, i) => (
              <li key={i} className={styles.problemItem}>
                <span className={styles.problemMark} aria-hidden="true">
                  !
                </span>
                <p className={styles.problemText}>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="trust-heading">
          <h2 id="trust-heading" className={styles.sectionTitle}>
            なぜ「現場」と「IT」の両方から伴走できるのか
          </h2>
          <p className={styles.sectionSubtitle}>
            私は<strong>介護福祉士の資格</strong>を持ち、介護の現場で働いた経験があるほか、<br />
            <strong>ITエンジニア</strong>として開発・設計の経験があります。<br />どちらか片方に寄りすぎない対話ができます。
          </p>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard} role="article">
              <p className={styles.trustLabel}>現場・福祉の視点</p>
              <h3 className={styles.trustCardTitle}>介護福祉士としての経験</h3>
              <p className={styles.trustCardBody}>
                利用者・家族・スタッフそれぞれの立場で何がしんどいか、記録や報連相が現場にどうのしかかっているかを、紙の現場も含めてイメージしながら聞き取ります。「現場が悪い」のではなく、構造や運用のどこに負荷が溜まっているかを一緒に特定します。
              </p>
            </div>
            <div className={styles.trustCard} role="article">
              <p className={styles.trustLabel}>IT・実装の視点</p>
              <h3 className={styles.trustCardTitle}>エンジニアとしての経験</h3>
              <p className={styles.trustCardBody}>
                何が技術的に可能で、何にコストや時間がかかるか、小さく試すにはどう分割するかをはっきり示します。きれいなスライドだけで終わらず、現場が続けられる運用とつながる提案を心がけています。
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.problemBand}`}
          aria-labelledby="solution-heading"
        >
          <h2 id="solution-heading" className={styles.sectionTitle}>
            具体的には、こんな風にお手伝いします
          </h2>
          <p className={styles.sectionSubtitle}>
            相談はヒアリングから。すでにシステムが入っている場合も、これから検討中の場合も構いません。
          </p>
          <ol className={styles.solutionList}>
            {solutions.map((item, index) => (
              <li key={item.title} className={styles.solutionItem}>
                <span className={styles.solutionNum}>{index + 1}</span>
                <div>
                  <h3 className={styles.solutionTitle}>{item.title}</h3>
                  <p className={styles.solutionBody}>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className={styles.ctaBlock}>
            <h2 id="cta-heading" className={styles.ctaTitle}>
              まずは状況をお聞かせください
            </h2>
            <p className={styles.ctaText}>
              うまく言葉にできなくても大丈夫です。いまの運用や困りごとを、お問い合わせフォームからお送りください。内容を確認のうえ、折り返しご連絡します。
            </p>
            <Link href="/contact" className={styles.ctaLink}>
              お問い合わせへ
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
