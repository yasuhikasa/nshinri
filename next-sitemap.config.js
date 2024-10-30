/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nshinri.net', // あなたのサイトのURL
  generateRobotsTxt: true, // robots.txtの自動生成
  sitemapSize: 7000, // サイトマップのページ数制限（必要に応じて）
  changefreq: 'daily', // サイトの更新頻度
  priority: 0.7, // ページの優先度
};
