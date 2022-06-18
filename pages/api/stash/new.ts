import { prisma } from "@lib/prisma";
import { getHostname } from "@lib/utils";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (session?.user?.email !== "kelshoff@grahamdigital.com") {
      return res.status(401).send({ message: "Unauthorized" });
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

      return res.status(200).json(newStash);
    }

    res.setHeader("Allow", "POST");
    return res.status(405).send({ message: "Method not allowed" });
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
