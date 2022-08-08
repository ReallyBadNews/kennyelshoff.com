import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[api/stash] req.query", req.query);
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_SECERT) {
    console.error("[api/stash] invalid secret");
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const path = req.query.path as string;
    console.log("[api/revalidate] path", path);
    await res.revalidate("/stash");
    await res.revalidate(path);
    return res.json({ message: "ok" });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
