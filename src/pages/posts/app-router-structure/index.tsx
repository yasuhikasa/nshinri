import Header from '../../../components/Header';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../Post.module.css';

export const title =
  'Next.js App Routerのディレクトリ構造と設計指針：日笠泰彰が実践するモダン開発';
export const description =
  'ITエンジニアの日笠泰彰です。Next.js App Routerにおける効率的なディレクトリ構造、Server Componentsの活用方法、そしてメンテナビリティを高めるための設計指針を徹底解説します。';
export const date = '2026-03-18';
export const author = '日笠泰彰';

export const content = `
  <h2>はじめに：なぜApp Routerの構造設計が重要なのか</h2>
  <p>Next.js 13以降、App Routerの導入によってフロントエンド開発の自由度は飛躍的に向上しました。しかし、自由度が高い反面、明確な設計指針を持たずに開発を進めると、コンポーネントの責務が曖昧になり、スパゲッティコード化するリスクも孕んでいます。</p>
  <p>日笠泰彰が現在推進しているカウンセリングサービスの開発プロジェクトでも、以下の設計思想をベースに構築しています。</p>

  <h2>1. 理想的なディレクトリ構成のサンプル</h2>
  <p>ルーティングとロジックを分離するため、以下のような構造を推奨しています。</p>
  <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto;">
app/
├── (auth)/           # Route Groups: 認証関連
│   ├── login/
│   └── register/
├── (main)/           # Route Groups: メイン機能
│   ├── dashboard/
│   └── posts/
├── api/              # Route Handlers
├── components/       # 共通UIコンポーネント
│   ├── elements/     # ボタン等の最小単位
│   └── layouts/      # ヘッダー・フッター等
└── lib/              # 共通ユーティリティ・ライブラリ設定
  </pre>

  <h2>2. Server Components と Client Components の使い分け</h2>
  <p>App Router最大の鍵は「デフォルトがServer Componentsである」点です。日笠の設計では、以下の基準でコンポーネントを分類しています。</p>
  <ul>
    <li><strong>Server Components:</strong> データフェッチ、バックエンドリソースへの直接アクセス、セキュリティ情報の保持。</li>
    <li><strong>Client Components:</strong> useStateやuseEffectなどのフックが必要なインタラクション、ブラウザAPIの利用、イベントリスナー。</li>
  </ul>
  <p>「可能な限りServer Componentsで構築し、末端のインタラクティブな部分だけをClient Componentsに切り出す」ことで、クライアント側に送るJavaScriptの量を最小限に抑えています。</p>

  <h2>3. コロケーション（Colocation）の推奨</h2>
  <p>App Routerでは、ページ固有のコンポーネントやCSSをそのルートディレクトリ内に配置する「コロケーション」が可能です。これにより、関連するファイルが物理的に近くに配置され、コードの可読性とメンテナンス性が劇的に向上します。</p>

  <h2>4. 開発におけるパフォーマンス最適化</h2>
  <p>Next.jsのCaching機構（Request Memoization, Data Cache等）を正しく理解することで、不要なAPIコールを防ぎ、爆速なユーザー体験を提供できます。特に、fetch関数の自動的なメモ化は、同じデータを複数のコンポーネントで必要とする場合に非常に強力な武器となります。</p>

  <h2>まとめ：継続的な改善が最高のサービスを作る</h2>
  <p>技術の進化は速いですが、本質的な「責務の分離」や「ユーザー体験の追求」は変わりません。日笠泰彰は、これからも最新のNext.jsの動向を追いながら、より質の高いエンジニアリングを提供し続けます。</p>
`;

const EnhancedAppRouterPost = () => {
  const url = 'https://nshinri.net/posts/app-router-structure';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://nshinri.net/aboutme',
    },
    publisher: { '@type': 'Organization', name: '日笠泰彰' },
    articleBody: content.replace(/<[^>]*>?/gm, ''),
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [{ url: 'https://nshinri.net/me.png' }],
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main
        className={styles.container}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}
      >
        <nav
          className={styles.breadcrumb}
          style={{ marginBottom: '20px', fontSize: '0.9rem' }}
        >
          <Link href="/">トップ</Link> ＞ <Link href="/posts">記事一覧</Link> ＞
          現在の記事
        </nav>

        <article>
          <header
            style={{
              borderBottom: '2px solid #eee',
              marginBottom: '30px',
              paddingBottom: '20px',
            }}
          >
            <h1
              className={styles.title}
              style={{ fontSize: '2rem', lineHeight: '1.4' }}
            >
              {title}
            </h1>
            <div
              style={{
                display: 'flex',
                gap: '15px',
                color: '#666',
                marginTop: '10px',
              }}
            >
              <span>📅 {date}</span>
              <span>👤 著者: {author}</span>
            </div>
          </header>

          <div
            className={styles.content}
            style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <footer
            style={{
              marginTop: '50px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
            }}
          >
            <h3>著者プロフィール</h3>
            <p>
              <strong>日笠泰彰（ひかさ やすあき）</strong>
              <br />
              ITエンジニアとして活動し、RailsやNext.jsを中心としたモダンなWeb開発を得意とする。現在はエンジニア向けのオンラインカウンセリングサービスの開発に従事。
            </p>
          </footer>
        </article>
      </main>
    </>
  );
};

export default EnhancedAppRouterPost;
