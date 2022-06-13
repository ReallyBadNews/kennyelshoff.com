import { prisma } from "@lib/prisma";
import { Prisma, Stash } from "@prisma/client";
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

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      return res.status(200).json(stash);
    }

    if (req.method === "PATCH") {
      const id = req.query.id as string;
      const reqBody: Prisma.StashUpdateWithoutTagsInput & {
        tags?: string[];
      } = req.body;

      console.log("[PATCH] reqBody", reqBody);

      if (!id) {
        return res.status(400).json({ message: "Missing Id" });
      }

      const requestBody: Prisma.StashUpdateInput = {
        ...reqBody,
        tags: undefined,
      };

      // TODO: doesn't work
      if (reqBody.tags) {
        requestBody.tags = {
          connectOrCreate: reqBody.tags.map((tag) => {
            return {
              where: {
                tag,
              },
              create: {
                tag,
              },
            };
          }),
        };
      }

      console.log("[PATCH] requestBody", requestBody);

      const stash = await prisma.stash.update({
        where: {
          id: Number(id),
        },
        data: {
          ...reqBody,
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
