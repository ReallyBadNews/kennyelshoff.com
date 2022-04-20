import { UnsplashPhotosAPIResp } from "@lib/types";
import { getUnsplashPhotos } from "@lib/unsplash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnsplashPhotosAPIResp>
) {
  try {
    const photos = await getUnsplashPhotos().then((response) => {
      return response;
    });

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1200, stale-while-revalidate=600"
    );
    res.status(200).json(photos);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json(error);
  }
}
