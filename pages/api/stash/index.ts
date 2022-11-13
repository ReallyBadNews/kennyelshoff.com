import { getAllStashes } from "@lib/stash";
import { Prisma } from "@prisma/client";
import type { NextApiHandler } from "next";
import { z } from "zod";

const PaginationSchema = z.object({
  page: z.number().min(0).optional(),
  limit: z.number().min(1).max(100).optional(),
});

const validatePagination = (values: unknown) => {
  const parsedData = PaginationSchema.parse(values);

  return parsedData;
};

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const page = (req.query.page as string) || "1";
      const limit = (req.query.limit as string) || "5";

      const pagination = validatePagination({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      });

      const stashes = await getAllStashes({
        page: pagination.page,
        limit: pagination.limit,
      });

      return res.status(200).json(stashes);
    }

    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error("[api/stash/[id] Prisma error", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
      console.error("[api/stash error", e);
      return res.status(500).json({ message: e.message });
    }

    // should never happen
    console.error("[api/stash/index] error", e);
    return res.status(500).json({ message: "Unknown internal server error" });
  }
};

export default handler;
