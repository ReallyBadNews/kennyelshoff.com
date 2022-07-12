import { getAllStashes } from "@lib/stash";
import { Prisma } from "@prisma/client";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const stashes = await getAllStashes();

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
    console.error("[api/stash] error", e);
    return res.status(500).send({ message: e.message });
  }
};

export default handler;
