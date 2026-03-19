import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  if (typeof url !== 'string')
    return res.status(400).json({ error: 'Invalid URL' });

  const { result } = await ogs({ url });
  res.status(200).json({
    title: result.ogTitle,
    description: result.ogDescription,
    image: result.ogImage?.[0]?.url,
    siteName: result.ogSiteName,
  });
}
