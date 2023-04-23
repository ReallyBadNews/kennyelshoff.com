import { createStash } from "@lib/stash";
import { CreateOrUpdateStashInput } from "@lib/types";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

    console.log("[api/stash/new] session", session);

    if (session?.user?.role !== "ADMIN") {
      console.log("[api/stash/new] Unauthorized", session?.user);
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
      const reqBody = JSON.parse(req.body) as CreateOrUpdateStashInput;

      console.log("[api/stash/new] reqBody", JSON.stringify(reqBody, null, 2));

      if (!reqBody.url) {
        return res.status(400).json({ message: "Missing url" });
      }

      const newStash = await createStash({ ...reqBody, author: session.user });

      const pathsToRevalidate = [
        `/stash`,
        `/stash/${newStash.slug}`,
        `/stash/edit/${newStash.id}`,
        ...newStash.tags.map((tag) => {
          return `/stash/tags/${tag.slug}`;
        }),
      ];

      fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECRET as string
        )}&paths=${encodeURIComponent(JSON.stringify(pathsToRevalidate))}`
      );

      return res.status(201).json(newStash);
    }

    res.setHeader("Allow", "POST");
    return res.status(405).send({ message: "Method not allowed" });
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
}
