import { getStashesByTag } from "@lib/stash";
import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log("[api/stash/tags] req.query", req.query);

    const tag = req.query.tag as string;

    console.log("[api/stash/tags] tag", tag);

    if (req.method === "GET") {
      const stashes = await getStashesByTag(tag);

      if (!stashes) {
        return res.status(404).json({ message: "Stashes not found" });
      }

      return res.status(200).json(stashes);
    }

    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not Allowed" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[api/stash/new Prisma error", e);
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(400).json({
          message:
            "There is a unique constraint violation, a new stash cannot be created with this url",
          code: e.code,
          meta: e.meta,
          cause: e.cause,
        });
      }

      return res.status(400).json({
        message: e.message,
        meta: e.meta,
        cause: e.cause,
        name: e.name,
        code: e.code,
      });
    }

    if (e instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        message: e.message,
        name: e.name,
        cause: e.cause,
      });
    }

    if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      return res.status(400).json({
        message: e.message,
        name: e.name,
        cause: e.cause,
      });
    }

    if (e instanceof Error) {
      console.error("[api/stash[id]] error", e);
      return res.status(500).json({ message: e.message });
    }

    // should never happen
    console.error("[api/stash/new error", e);
    return res.status(500).json({ message: "Unknown internal server error" });
  }
};

export default handler;
