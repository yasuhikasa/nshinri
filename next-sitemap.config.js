import path from 'path';
import fs from 'fs';
import { client } from '@/lib/microcms';

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
      const posts = await client.get({
        endpoint: 'posts', // あなたのエンドポイント名
        queries: { fields: 'slug,updatedAt', limit: 100 },
      });

      posts.contents.forEach((post) => {
        result.push({
          loc: `/posts/${post.slug}`,
          lastmod: post.updatedAt || new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        });
      });
    } catch (error) {
      console.error('microCMSの取得に失敗しました:', error);
    }

    return result;
  },
};

export default config;
