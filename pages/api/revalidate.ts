import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[api/revalidate] req.query", req.query);
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_SECERT) {
    console.error("[api/revalidate] invalid secret");
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const encodedPath = req.query.paths as string;
    const paths = JSON.parse(decodeURIComponent(encodedPath)) as string[];
    console.log("[api/revalidate] path array", paths);

    await Promise.all(
      paths.map(async (path) => {
        console.log("[api/revalidate] revalidated", path);
        await res.revalidate(path);
      })
    );

    return res.json({ message: "ok" });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error("[api/revalidate] error", err);
    return res.status(500).send("Error revalidating");
  }
}
