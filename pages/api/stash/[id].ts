import { deleteStashById, getStashById, updateStashById } from "@lib/stash";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    console.log("[api/stash] session", session);

    if (req.method === "GET") {
      const id = req.query.id as string;
      const stash = await getStashById(id);

      if (!stash) {
        return res.status(404).send({ message: "Stash not found" });
      }

      return res.status(200).json(stash);
    }

    if (session?.user?.email !== "kelshoff@grahamdigital.com") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (req.method === "PATCH") {
      const id = req.query.id as string;
      const reqBody = req.body as Prisma.StashCreateWithoutTagsInput & {
        tags?: string[];
      };

      const stash = await updateStashById(id, reqBody);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      return res.status(200).json(stash);
    }

    if (req.method === "DELETE") {
      const id = req.query.id as string;

      const stash = await deleteStashById(id);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      return res.status(200).json(stash);
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
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
}
