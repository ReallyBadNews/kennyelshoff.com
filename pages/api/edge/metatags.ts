import { getMetadataFromUrl } from "@lib/metadata";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method === "GET") {
    const url = req.nextUrl.searchParams.get("url");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      new URL(url as string).hostname;
    } catch (e) {
      return new Response("Invalid URL", { status: 400 });
    }

    const metatags = await getMetadataFromUrl(url as string);

    return new Response(JSON.stringify(metatags), { status: 200 });
  }
  return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
}
