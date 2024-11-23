import path from 'path';
import fs from 'fs';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://nshinri.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, url) => {
    if (url === '/') {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 1.0,
      };
    }
    if (url.startsWith('/posts/')) {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 0.9,
      };
    }
    return {
      loc: url,
      changefreq: 'daily',
      priority: 0.7,
    };
  },
  additionalPaths: async () => {
    const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const postPaths = filenames.map((filename) => ({
      loc: `/posts/${filename.replace('.md', '')}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    }));

    const staticPages = fs
      .readdirSync(path.join(process.cwd(), 'src', 'pages'))
      .filter((staticPage) => {
        return (
          ![
            '_app.tsx',
            '_document.tsx',
            '404.tsx',
            'api',
            'posts',
            'fonts', // fonts ディレクトリを除外
            'index.tsx',
          ].includes(staticPage) && !staticPage.endsWith('.css')
        );
      })
      .map((staticPage) => ({
        loc: `/${staticPage.replace('.tsx', '')}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      }));

    return [
      {
        loc: '/', // トップページを先頭に追加
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      ...postPaths,
      ...staticPages,
    ];
  },
};

export default config;
