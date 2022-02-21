import type { NextApiRequest, NextApiResponse } from "next";
import Unsplash, { toJson } from "unsplash-js";

let unsplash: Unsplash;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!unsplash) {
    unsplash = new Unsplash({
      accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
    });
  }

  const userStats = await unsplash.users
    .statistics("reallybadnews")
    .catch((err: Error) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });

  const { downloads, views } = (await toJson(userStats)) as {
    downloads?: {
      total: number;
    };
    views?: {
      total: number;
    };
  };

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  return res.status(200).json({
    downloads: downloads?.total,
    views: views?.total,
  });
}
