import { prisma } from "@lib/prisma";
import { Stash } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stash | null | { message: string }>
) {
  try {
    if (req.method === "GET") {
      const id = req.query.id as string;
      const stash = await prisma.stash.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          tags: true,
        },
      });

      return res.status(200).json(stash);
    }

    return res.status(500).json({ message: "Invalid method" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
