import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './zenn.module.css';

interface OgpItem {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  error?: string;
}

const ARTICLE_URLS = [
  'https://zenn.dev/yasuhikasa/articles/7a6cf546173db9',
  'https://zenn.dev/yasuhikasa/articles/27d7fdb1fa7ee0',
  'https://zenn.dev/yasuhikasa/articles/11e741c8b8b869',
  'https://zenn.dev/yasuhikasa/articles/23b06b13bd0105',
  'https://zenn.dev/yasuhikasa/articles/cf9d2f2d77c014',
  'https://zenn.dev/yasuhikasa/articles/18688606e6f6d5',
  'https://zenn.dev/yasuhikasa/articles/284b425bb55a0a',
  'https://zenn.dev/yasuhikasa/articles/8df3eb981d7d42',
  'https://zenn.dev/yasuhikasa/articles/4064f80757e1dc',
  'https://qiita.com/hikasayasu/items/bacd4bf8e31c0294f305',
  'https://qiita.com/hikasayasu/items/4abad2d33024a58f0faf',
  'https://qiita.com/hikasayasu/items/c06ba9166c1242c33d0f',
  'https://note.com/jazzy_gecko3968/n/nfc3bfdab439a',
  'https://note.com/jazzy_gecko3968/n/n681470342d50',
  'https://note.com/jazzy_gecko3968/n/n8047e5f8f34f',
  'https://note.com/jazzy_gecko3968/n/nc5de150b8391',
];

export default function ZennCardsPage() {
  const [items, setItems] = useState<OgpItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        ARTICLE_URLS.map(async (url): Promise<OgpItem> => {
          try {
            const res = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
            if (!res.ok) {
              return { url, error: `取得失敗 (${res.status})` };
            }
            const data = await res.json();
            return {
              url,
              title: data.title,
              description: data.description,
              image: data.image,
              siteName: data.siteName,
            };
          } catch {
            return { url, error: 'ネットワークエラー' };
          }
        })
      );
      setItems(results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <NextSeo
        title="技術ブログサイト記事リンク一覧 | 日笠泰彰"
        description="Zenn・Qiita・noteの記事URLを貼るだけで、OGPを使ったカード一覧を生成できるページです。"
        canonical="https://nshinri.net/zenn"
        openGraph={{
          title: '記事リンクカード一覧 | 日笠泰彰',
          description:
            'Zenn・Qiita・noteの記事URLを貼るだけで、OGPを使ったカード一覧を生成できます。',
          url: 'https://nshinri.net/zenn',
          type: 'website',
          images: [{ url: 'https://nshinri.net/me.png' }],
          site_name: "N's WorkRoom",
        }}
      />
      <Head>
        <title>技術ブログサイト記事リンク一覧</title>
      </Head>
      <Header />

      <main className={styles.container}>
        <Breadcrumb />

        <h1 className={styles.heading}>記事リンクカード一覧</h1>
        <p className={styles.intro}>
          Zenn・Qiita・note の記事URLを表示しています。
        </p>

        {loading && (
          <div className={styles.loadingWrap} role="status" aria-live="polite">
            <div className={styles.spinner} />
            <p className={styles.loadingText}>記事カードを取得中です...</p>
          </div>
        )}

        <section className={styles.grid}>
          {items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || item.url}
                  className={styles.image}
                />
              ) : (
                <div className={styles.imagePlaceholder}>No Image</div>
              )}

              <div className={styles.cardBody}>
                <p className={styles.siteName}>{item.siteName || 'Article'}</p>
                <h2 className={styles.cardTitle}>{item.title || item.url}</h2>
                {/* <p className={styles.cardDescription}>
                  {item.error ||
                    item.description ||
                    '説明が取得できませんでした。'}
                </p> */}
              </div>
            </a>
          ))}
        </section>
      </main>
    </>
  );
}
