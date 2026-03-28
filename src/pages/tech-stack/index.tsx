import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import { NextSeo } from 'next-seo';
import styles from './tech-stack.module.css';

const canonical = 'https://nshinri.net/tech-stack';
const pageTitle = '開発でできること | 日笠泰彰';
const pageDescription =
  '日笠泰彰への開発依頼で実現できることの例。サイト公開、問い合わせ受付、記事更新、会員向けページ、外部サービス連携など。ご相談はお問い合わせから。';

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
      name: '開発でできること',
      item: canonical,
    },
  ],
};

const capabilities = [
  {
    title: '会社・お店・個人の「顔」になるサイトをつくれます',
    text: 'サービス内容や料金、実績、スタッフ紹介、アクセスやSNSへの導線など、初めての方にも伝わるページにまとめられます。スマホで見たときも読みやすく、検索で見つけてもらいやすい形にもできます。',
  },
  {
    title: 'お問い合わせや申込み・予約を、Webで受け付けられます',
    text: 'フォームで必要な情報を集めて、メールで通知したり、一覧で確認したりする流れまで含めて設計できます。「紙や電話だけだと漏れやすい」を減らす用途に向いています。',
  },
  {
    title: '記事やお知らせを、自分たちで載せ続けられます',
    text: 'ブログやニュースのように、文章や画像をあとから追加・差し替えしやすい仕組みにできます。更新のたびにエンジニアを呼ばなくても回る運用を目指せます。',
  },
  {
    title: '「ログインした人だけ」向けのページもつくれます',
    text: '会員向けの資料や履歴、社内だけの連絡・手続きなど、一般には見せたくない情報は鍵付きで出し分けできます。誰が何を見られるかも、段階的に決められます。',
  },
  {
    title: '使っているサービスとつなげたり、決まった作業を自動化したりできます',
    text: '決済、予約、広告・分析、在庫や顧客管理など、すでにお使いのツールとデータのやり取りをつなぐことも可能です。毎日・毎週の同じ作業を、決まった時間に自動で回すような仕組みも検討できます。',
  },
  {
    title: '小さく始めて、あとから広げていけます',
    text: 'いきなり大規模にせず、まずは必要な部分だけ公開し、反応や業務の変化に合わせて機能やページを足していく進め方ができます。のちの変更や追加を見据えた土台づくりも一緒に考えます。',
  },
];

const frontendItems = [
  {
    name: 'Next.js（React）',
    text: 'サイト全体の土台から、ボタン・フォーム・一覧など画面の部品づくりまで、ブラウザに表示される部分の中核として使います。ページの出し方や画像の最適化など、公開後も運用しやすい形にまとめるのにも向いています。',
  },
  {
    name: 'TypeScript',
    text: 'フロントエンド側で動くさまざまな処理の実装に使います。たとえば表示の切り替え、入力内容の扱い、サーバーに送る前の整理、エラーや読み込み中の表示などです。仕様を足したり直したりするときも、コードを追いやすくするための言語です。',
  },
];

const backendItems = [
  {
    name: 'Ruby on Rails',
    text: 'お問い合わせの保存、管理画面、会員データの扱いなど、「業務の流れをサーバー側でまとめる」用途に対応できます。既存のRails製システムの改修にも対応可能です。',
  },
  {
    name: 'Node.js',
    text: '外部サービスとのAPI連携、決まったタイミングでの自動処理、データの受け渡しなど、裏側の処理やつなぎ込みに使います。',
  },
];

export default function TechStackPage() {
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
      <main className={styles.container}>
        <Breadcrumb currentLabel="開発でできること" />
        <h1 className={styles.heading}>開発でできること</h1>
        <p className={styles.lead}>
          依頼いただいたときに、こういう形でお手伝いできることがあります。当てはまるものがなくても大丈夫です。やりたいことを言葉にしづらい段階から、一緒に整理します。
        </p>
        <div className={styles.grid}>
          {capabilities.map((item) => (
            <article key={item.title} className={styles.card}>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardBody}>{item.text}</p>
            </article>
          ))}
        </div>
        <section
          className={styles.techStackSection}
          aria-labelledby="tech-stack-heading"
        >
          <h2 id="tech-stack-heading" className={styles.techStackHeading}>
            技術スタック
          </h2>
          <p className={styles.techStackLead}>
            画面に見える部分（フロントエンド）と、データや処理の裏側（バックエンド）に分けて、主に次の技術で対応できます。案件の内容や規模に合わせて組み合わせは変わります。詳しくはお問い合わせのときにご説明します。
          </p>
          <div className={styles.techStackColumns}>
            <div className={styles.techStackColumn}>
              <h3 className={styles.techStackSubheading}>フロントエンド</h3>
              <p className={styles.techStackColumnIntro}>
                ブラウザ上で表示されるページや、クリック・入力などの操作まわりです。
              </p>
              <ul className={styles.techStackList}>
                {frontendItems.map((item) => (
                  <li key={item.name} className={styles.techStackItem}>
                    <span className={styles.techStackName}>{item.name}</span>
                    <span className={styles.techStackDesc}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.techStackColumn}>
              <h3 className={styles.techStackSubheading}>バックエンド</h3>
              <p className={styles.techStackColumnIntro}>
                データの保存・検索、登録処理、外部サービスとの通信など、サーバー側の仕事です。
              </p>
              <ul className={styles.techStackList}>
                {backendItems.map((item) => (
                  <li key={item.name} className={styles.techStackItem}>
                    <span className={styles.techStackName}>{item.name}</span>
                    <span className={styles.techStackDesc}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <div className={styles.ctaBlock}>
          <p className={styles.ctaText}>
            「こんなことできる？」「まず何から話せばいい？」も大丈夫です。お問い合わせフォームからお送りください。内容を確認のうえ、折り返しご連絡します。
          </p>
          <Link href="/contact" className={styles.ctaLink}>
            お問い合わせへ
          </Link>
        </div>
      </main>
    </>
  );
}
