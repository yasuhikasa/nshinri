import { createClient } from 'microcms-js-sdk';

// ここで環境変数をチェック
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('microCMSの環境変数が設定されていません');
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export const getList = async (queries?: any) => {
  return await client.getList({ endpoint: 'blog', queries });
};

export const getDetail = async (contentId: string, queries?: any) => {
  return await client.getListDetail({ endpoint: 'blog', contentId, queries });
};
