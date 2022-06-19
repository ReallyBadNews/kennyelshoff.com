import { prisma } from "@lib/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      /**
       * TODO:
       * - Add pagination
       * - Abstract fetch and tranform into function
       * - Convert `createdAt` and `updatedAt` with `.toISOString()`
       * - Transform `body` to mdxBody
       */
      const stashes = await prisma.stash.findMany({
        include: {
          tags: true,
        },
      });

      return res.status(200).json({ stashes, total: stashes.length });
    }

    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
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
