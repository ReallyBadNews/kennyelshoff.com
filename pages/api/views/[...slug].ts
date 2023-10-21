import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ total: number } | { message: string }>,
) {
  try {
    const { slug } = req.query;
    const pagePath = typeof slug === "object" ? `/${slug.join("/")}` : slug;

    if (!pagePath) {
      return res.status(400).json({ message: "Missing slug" });
    }

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

    res.setHeader("Allow", "POST, GET");
    return res.status(405).json({ message: "Method not Allowed" });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(400).json({
          message:
            "There is a unique constraint violation, a new stash cannot be created with this url",
        });
      }
      return res.status(500).json(e);
    }
    return res.status(500).json({ message: e.message });
  }
}
