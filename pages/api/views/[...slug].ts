import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ total: number } | { message: string }>
) {
  try {
    const { slug } = req.query;
    const pagePath = typeof slug === "string" ? slug : `/${slug.join("/")}`;

    if (req.method === "POST") {
      const newOrUpdatedViews = await prisma.views.upsert({
        where: { slug: pagePath },
        create: {
          slug: pagePath,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        total: Number(newOrUpdatedViews.count),
      });
    }

    if (req.method === "GET") {
      const views = await prisma.views.findUnique({
        where: {
          slug: pagePath,
        },
      });

      return res.status(200).json({ total: Number(views?.count) || 0 });
    }

    return res.status(500).json({ message: "Invalid method" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
