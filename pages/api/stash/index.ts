import { getAllStashes } from "@lib/stash";
import { Prisma } from "@prisma/client";
import type { NextApiHandler } from "next";
import { z } from "zod";

const PaginationSchema = z.object({
  take: z.number().min(1).max(100).optional(),
  skip: z.number().min(0).optional(),
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

      console.log("[api/stash]", { page, limit });

      const pagination = validatePagination({
        take: limit ? parseInt(limit, 10) : undefined,
        skip: page === "1" ? 0 : (parseInt(page, 10) - 1) * parseInt(limit, 10),
      });

      const stashes = await getAllStashes({
        take: pagination.take,
        skip: pagination.skip,
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
