import { createStash } from "@lib/stash";
import { CreateOrUpdateStashInput } from "@lib/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  // TOOD: type this to use it `useSWRMutation` generic
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

    if (session?.user?.role !== "ADMIN") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
      const reqBody = JSON.parse(req.body) as CreateOrUpdateStashInput;

      console.log("[api/stash] reqBody", JSON.stringify(reqBody, null, 2));

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

      await fetch(
        `${baseUrl}/api/revalidate?secret=${encodeURIComponent(
          process.env.NEXT_REVALIDATE_SECRET as string
        )}&paths=${encodeURIComponent(JSON.stringify(pathsToRevalidate))}`
      );

      return res.status(201).json(newStash);
    }

    res.setHeader("Allow", "POST");
    return res.status(405).send({ message: "Method not allowed" });
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
    console.error("[api/stash/new] error", e);
    return res.status(500).send({ message: e.message });
  }
}
