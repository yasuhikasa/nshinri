import path from 'path';
import fs from 'fs';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://nshinri.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async () => {  // `config` パラメータを削除
    const postsDirectory = path.join(process.cwd(), 'public', 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map((filename) => ({
      loc: `/posts/${filename.replace('.md', '')}`,
      lastmod: new Date().toISOString(),
    }));
  },
};

export default config;
