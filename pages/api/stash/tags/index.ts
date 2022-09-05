import { getStashesByTag } from "@lib/stash";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  console.log("[api/stash/tags] req.query", req.query);

  const tag = req.query.tag as string;

  console.log("[api/stash/tags] tag", tag);

  if (req.method === "GET") {
    const stashes = await getStashesByTag(tag);

    if (!stashes) {
      return res.status(404).json({ message: "Stashes not found" });
    }

    return res.status(200).json(stashes);
  }

  res.setHeader("Allow", "GET");
  return res.status(405).json({ message: "Method not Allowed" });
};

export default handler;
