import path from 'path';
import fs from 'fs';
// import { client } from './src/lib/microcms.ts';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://nshinri.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/posts/[slug]'],

  additionalPaths: async () => {
    const result = [];

    // 1. トップページ
    result.push({
      loc: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    });

    // 2. contents/posts 内の .md ファイル
    const mdPostsDir = path.join(process.cwd(), 'contents', 'posts');
    if (fs.existsSync(mdPostsDir)) {
      fs.readdirSync(mdPostsDir).forEach((file) => {
        if (file.endsWith('.md')) {
          result.push({
            loc: `/posts/${file.replace('.md', '')}`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.9,
          });
        }
      });
    }

    // 3. src/pages/posts 内のディレクトリ(index.tsx) または .tsx ファイルをスキャン
    const tsxPostsDir = path.join(process.cwd(), 'src', 'pages', 'posts');
    if (fs.existsSync(tsxPostsDir)) {
      const items = fs.readdirSync(tsxPostsDir);
      items.forEach((item) => {
        const fullPath = path.join(tsxPostsDir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          // 動的ルートディレクトリ([slug])は除外
          if (item.startsWith('[')) return;
          // ディレクトリの場合: 中に index.tsx があればそのディレクトリ名をURLにする
          if (fs.existsSync(path.join(fullPath, 'index.tsx'))) {
            result.push({
              loc: `/posts/${item}`,
              lastmod: new Date().toISOString(),
              changefreq: 'daily',
              priority: 0.9,
            });
          }
        } else if (item.endsWith('.tsx') && item !== 'index.tsx') {
          // ファイルの場合: app-router-structure.tsx のような形式
          if (item.startsWith('[')) return;
          result.push({
            loc: `/posts/${item.replace('.tsx', '')}`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.9,
          });
        }
      });
    }

    // 4. src/pages 直下の静的ページ (index, posts, _app 等を除外)
    const staticPagesDir = path.join(process.cwd(), 'src', 'pages');
    if (fs.existsSync(staticPagesDir)) {
      const ignoreList = [
        '_app.tsx',
        '_document.tsx',
        '404.tsx',
        'api',
        'fonts',
        'index.tsx',
        'posts',
      ];
      fs.readdirSync(staticPagesDir).forEach((file) => {
        if (file.endsWith('.tsx') && !ignoreList.includes(file)) {
          result.push({
            loc: `/${file.replace('.tsx', '')}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
          });
        }
      });
    }

    // 5. microCMS から動的記事を取得して追加
    try {
      const SERVICE_ID = process.env.MICROCMS_SERVICE_DOMAIN;
      const API_KEY = process.env.MICROCMS_API_KEY;
      const ENDPOINT = 'blog'; // エンドポイント名

      if (!SERVICE_ID || !API_KEY) {
        throw new Error('microCMS環境変数が未設定です');
      }

      const response = await fetch(
        `https://${SERVICE_ID}.microcms.io/api/v1/${ENDPOINT}?fields=id,slug,updatedAt&limit=100`,
        {
          headers: { 'X-MICROCMS-API-KEY': API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error(`microCMS fetch error: ${response.status}`);
      }

      const data = await response.json();

      data.contents.forEach((post) => {
        const identifier = post.slug || post.id;
        if (!identifier) return;

        result.push({
          loc: `/posts/${identifier}`,
          lastmod: post.updatedAt || new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        });
      });
      console.log(
        `✅ microCMSから ${data.contents.length} 件の記事をサイトマップに追加しました`
      );
    } catch (error) {
      console.error('❌ microCMSの取得に失敗しました:', error);
    }

    return result;
  },
};

export default config;
