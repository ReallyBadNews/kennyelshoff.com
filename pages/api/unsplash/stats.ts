import { getUnsplashStats } from "@lib/unsplash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ downloads: number; views: number }>
) {
  try {
    const stats = await getUnsplashStats().then((response) => {
      return {
        downloads: response.downloads.total,
        views: response.views.total,
      };
    });

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1200, stale-while-revalidate=600"
    );
    res.status(200).json(stats);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json(error);
  }
}
