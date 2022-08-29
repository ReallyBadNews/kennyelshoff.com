import { getAllStashes } from "@lib/stash";
import { Prisma } from "@prisma/client";
import type { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const page = req.query.page as string | undefined;
      const limit = req.query.limit as string | undefined;

      const pageSchema = z.number().int().positive();
      const limitSchema = z.number().int().positive();

      const stashes = await getAllStashes({
        take: limitSchema.parse(limit),
        skip: pageSchema.parse(page) * 25,
      });

      return res.status(200).json(stashes);
    }

    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(400).json({
          message:
            "There is a unique constraint violation, a new stash cannot be created with this url",
        });
      }
    }
    console.error("[api/stash/index] error", e);
    return res.status(500).send({ message: e.message });
  }
};

export default handler;
