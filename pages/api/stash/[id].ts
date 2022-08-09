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
      const id = req.query.id as string;
      const stash = await getStashById(id);

      if (!stash) {
        return res.status(404).send({ message: "Stash not found" });
      }

      // TOOD: Make sure caching values are correct
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=1200, stale-while-revalidate=600"
      );

      return res.status(200).json(stash);
    }

    if (session?.user.role !== "ADMIN") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (req.method === "PATCH") {
      const id = req.query.id as string;
      const reqBody: CreateOrUpdateStashInput = JSON.parse(req.body);

      const stash = await updateStashById(id, reqBody);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      // TODO: implement revalidate for all pages that use this stash
      const pathsToRevalidate = [
        `/stash`,
        `/stash/${stash.slug}`,
        `/stash/edit/${id}`,
        ...stash.tags.map((tag) => {
          return `/stash/tags/${tag.slug}`;
        }),
      ];

      console.log("[api/stash] pathsToRevalidate", pathsToRevalidate);

      await fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECERT as string
        )}&paths=${encodeURIComponent(JSON.stringify(pathsToRevalidate))}`
      );

      return res.status(200).json(stash);
    }

    if (req.method === "DELETE") {
      const id = req.query.id as string;

      if (!id) {
        return res.status(400).send({ message: "Missing id" });
      }

      const stash = await deleteStashById(id);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      await fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECERT as string
        )}&path=${encodeURIComponent(`/stash/edit/${id}`)}`
      );

      return res.status(200).json({ message: "Stash deleted" });
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
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
    console.error("[api/stash[id]] error", e);
    return res.status(500).send({ message: e.message });
  }
}
