import { deleteStashById, getStashById, updateStashById } from "@lib/stash";
import { CreateOrUpdateStashInput } from "@lib/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

    if (req.method === "GET") {
      const { id } = req.query as { id: string };
      const stash = await getStashById(id);

      if (!stash) {
        return res.status(404).send({ message: "Stash not found" });
      }

      return res.status(200).json(stash);
    }

    if (session?.user.role !== "ADMIN") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (req.method === "PATCH") {
      const { id } = req.query as { id: string; body: string };
      const reqBody = JSON.parse(req.body) as CreateOrUpdateStashInput;

      const stash = await updateStashById(id, reqBody);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      const pathsToRevalidate = [
        `/stash`,
        `/stash/${stash.slug}`,
        `/stash/edit/${id}`,
        ...stash.tags.map((tag) => {
          return `/stash/tags/${tag.slug}`;
        }),
      ];

      // TODO: Do not revalidate within this api route, it will timeout at scale
      fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECRET as string
        )}&paths=${encodeURIComponent(JSON.stringify(pathsToRevalidate))}`
      );

      return res.status(200).json(stash);
    }

    if (req.method === "DELETE") {
      const { id } = req.query as { id: string };

      if (!id) {
        return res.status(400).send({ message: "Missing id" });
      }

      const stash = await deleteStashById(id);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      const pathsToRevalidate = [
        `/stash`,
        `/stash/${stash.slug}`,
        `/stash/edit/${id}`,
        ...stash.tags.map((tag) => {
          return `/stash/tags/${tag.slug}`;
        }),
      ];

      fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECRET as string
        )}&paths=${encodeURIComponent(JSON.stringify(pathsToRevalidate))}`
      );

      return res.status(200).json({ message: "Stash deleted" });
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[api/stash/[id] Prisma error", e);
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
    console.error("[api/stash[id]] error", e);
    return res.status(500).json({ message: "Unknown internal server error" });
  }
}
