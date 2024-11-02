import path from 'path';
import fs from 'fs';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://nshinri.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7, // デフォルトの優先度
  transform: async (config, url) => {
    // トップページの優先度を 1.0 に設定
    if (url === '/') {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 1.0,
      };
    }
    // コラムページ（/posts/ で始まるURL）の優先度を 0.9 に設定
    if (url.startsWith('/posts/')) {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 0.9,
      };
    }
    // それ以外のページはデフォルトの priority: 0.7 を使用
    return {
      loc: url,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
  additionalPaths: async () => {
    const postsDirectory = path.join(process.cwd(), 'public', 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map((filename) => ({
      loc: `/posts/${filename.replace('.md', '')}`,
      lastmod: new Date().toISOString(),
    }));
  },
};

export default config;
