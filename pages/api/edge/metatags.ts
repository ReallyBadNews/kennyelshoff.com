import type { NextFetchEvent, NextRequest } from "next/server";
import { getMetadataFromUrl } from "@lib/metadata";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest, ev: NextFetchEvent) {
  if (req.method === "GET") {
    const url = req.nextUrl.searchParams.get("url");
    try {
      new URL(url).hostname;
    } catch (e) {
      return new Response("Invalid URL", { status: 400 });
    }
    const metatags = await getMetadataFromUrl(url, ev);
    return new Response(JSON.stringify(metatags), { status: 200 });
  }
  return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
}
