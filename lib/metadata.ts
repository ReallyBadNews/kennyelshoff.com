import { unescape } from "html-escaper";

export const getMetadataFromUrl = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    return controller.abort();
  }, 5000); // timeout if it takes longer than 5 seconds
  const metatags = await fetch(url, {
    signal: controller.signal,
    headers: {
      "User-Agent": "dub-bot/1.0",
    },
  })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.text();
    })
    .then((body: string) => {
      const obj: Record<string, string> = {};
      // get all meta tags
      body.replace(
        /<meta\s+(?:name|property|itemprop|http-equiv)="([^"]+)"\s+content="([^"]+)"/g,
        // @ts-expect-error - ignore
        (_, key, value) => {
          obj[key] = unescape(value).replaceAll("&#x27;", "'");
        },
      );
      // get all meta tags (reversed order for content & name/property)
      body.replace(
        /<meta\s+content="([^"]+)"\s+(?:name|property|itemprop|http-equiv)="([^"]+)"/g,
        // @ts-expect-error - ignore
        (_, value, key) => {
          obj[key] = unescape(value).replaceAll("&#x27;", "'");
        },
      );
      // get all title tags
      body.replace(
        /<title>([^<]+)<\/title>/g,
        // @ts-expect-error - ignore
        (_, value) => {
          obj.title = unescape(value).replaceAll("&#x27;", "'");
        },
      );
      // get all link tags
      body.replace(
        /<link\s+(?:rel|itemprop)="([^"]+)"\s+href="([^"]+)"/g,
        // @ts-expect-error - ignore
        (_, key, value) => {
          obj[key] = unescape(value).replaceAll("&#x27;", "'");
        },
      );

      console.log("[metatags]", obj);

      const title = obj["og:title"] || obj["twitter:title"] || obj.title;

      const description =
        obj.description || obj["og:description"] || obj["twitter:description"];

      let image =
        obj["og:image"] || obj["twitter:image"] || obj.icon || obj.image_src;

      if (image && image.startsWith("//")) {
        image = `https:${image}`;
      } else if (image && image.startsWith("/")) {
        image = new URL(url).origin + image;
      }

      return {
        title,
        description,
        image,
      };
    })
    .catch((err) => {
      console.error(err);
      return null; // if there's an error, return null
    });
  return metatags;
};
