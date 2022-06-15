import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ total: number } | { message: string }>
) {
  try {
    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true,
      },
    });

    return res.status(200).json({ total: Number(totalViews._sum.count) });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(400).json(e);
      }
      return res.status(500).json(e);
    }
    return res.status(500).json({ message: e.message });
  }
}
