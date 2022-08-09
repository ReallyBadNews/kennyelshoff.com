import { deleteStashById, getStashById, updateStashById } from "@lib/stash";
import { CreateOrUpdateStashInput } from "@lib/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { withSentry } from "@sentry/nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (session?.user.role !== "ADMIN") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (req.method === "PATCH") {
      const id = req.query.id as string;
      const reqBody: CreateOrUpdateStashInput = JSON.parse(req.body);
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

      console.log("[api/stash] PATCH reqBody", reqBody);

      const stash = await updateStashById(id, reqBody);

      if (!stash) {
        return res.status(404).json({ message: "Stash not found" });
      }

      // const urlToRevalidate = req.url?.replace("/api", "") || "/";

      console.log("[api/stash] PATCH req.url", id);

      // TODO: pass `path` as a csv string to revalidate
      await fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECERT as string
        )}&path=${encodeURIComponent(`/stash/edit/${id}`)}`
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
};

export default withSentry(handler);

export const config = {
  api: {
    externalResolver: true,
  },
};
