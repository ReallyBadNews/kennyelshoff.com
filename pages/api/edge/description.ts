import type { NextRequest } from "next/server";
import { getDescriptionFromUrl } from "@lib/metadata";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  if (req.method === "GET") {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      return new Response("Missing url", { status: 400 });
    }

    const description = await getDescriptionFromUrl(url);

    return new Response(JSON.stringify(description), { status: 200 });
  }

  return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
}
