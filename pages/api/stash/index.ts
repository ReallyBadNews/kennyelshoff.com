import { prisma } from "@lib/prisma";
import { getHostname } from "@lib/utils";
import { Prisma } from "@prisma/client";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const stashes = await prisma.stash.findMany({
        include: {
          tags: true,
        },
      });

      return res.status(200).json({ stashes, total: stashes.length });
    }

    if (req.method === "POST") {
      const reqBody = req.body as Prisma.StashCreateWithoutTagsInput & {
        tags?: string[];
      };

      if (!reqBody.url) {
        return res.status(400).json({ message: "Missing url" });
      }

      const requestBody: Prisma.StashCreateInput = {
        ...reqBody,
        tags: undefined,
      };

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

      requestBody.host = getHostname(reqBody.url);

      const newStash = await prisma.stash.create({
        data: requestBody,
        include: {
          tags: true,
        },
      });

      return res.status(200).json({
        ...newStash,
      });
    }

    return res.status(500).json({ message: "Invalid method" });
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
};

export default handler;
