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
        }
      );
      // get all meta tags (reversed order for content & name/property)
      body.replace(
        /<meta\s+content="([^"]+)"\s+(?:name|property|itemprop|http-equiv)="([^"]+)"/g,
        // @ts-expect-error - ignore
        (_, value, key) => {
          obj[key] = unescape(value).replaceAll("&#x27;", "'");
        }
      );
      // get all title tags
      body.replace(
        /<title>([^<]+)<\/title>/g,
        // @ts-expect-error - ignore
        (_, value) => {
          obj.title = unescape(value).replaceAll("&#x27;", "'");
        }
      );
      // get all link tags
      body.replace(
        /<link\s+(?:rel|itemprop)="([^"]+)"\s+href="([^"]+)"/g,
        // @ts-expect-error - ignore
        (_, key, value) => {
          obj[key] = unescape(value).replaceAll("&#x27;", "'");
        }
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

export const getTitleFromUrl = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    return controller.abort();
  }, 5000); // timeout if it takes longer than 2 seconds

  const title = await fetch(url, { signal: controller.signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.text();
    })
    .then((body: string) => {
      const match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
      if (!match || typeof match[1] !== "string") return "No title found"; // if no title found, return "No title found"
      return match[1];
    })
    .catch((err) => {
      console.error(err);
      return "No title found"; // if there's an error, return "No title found"
    });

  return title;
};

export const getDescriptionFromUrl = async (url: string) => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    return controller.abort();
  }, 5000); // timeout if it takes longer than 2 seconds

  const description = await fetch(url, { signal: controller.signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.text();
    })
    .then((body: string) => {
      const match = body.match(/<meta name="description" content="(.*?)"\/>/g); // regular expression to parse contents of the description meta tag
      if (!match || typeof match[0] !== "string")
        return "No meta description tag found"; // if no description found, return "No description found"
      const matchDescription = match[0].match(/content="(.*)"\/>/)?.pop();
      if (!matchDescription) return "No description content found";
      return matchDescription;
    })
    .catch((err) => {
      console.error(err);
      return "No description found"; // if there's an error, return "No title found"
    });

  return description;
};

export const getOGImageFromUrl = async (url: string) => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    return controller.abort();
  }, 5000); // timeout if it takes longer than 2 seconds

  const ogImage = await fetch(url, { signal: controller.signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.text();
    })
    .then((body: string) => {
      // regular expression to parse contents of the og:image meta tag
      const match = body.match(/<meta property="og:image" content="(.*?)"\/>/g);
      if (!match || typeof match[0] !== "string") {
        console.error("No meta og:image found");
        return "No og:image found"; // if no og:image found, return "No og:image found"
      }
      const matchImage = match[0].match(/content="(.*)"\/>/)?.pop();
      if (!matchImage) return "No og:image content found";
      return matchImage;
    })
    .catch((err) => {
      console.error(err);
      return "No og:image found"; // if there's an error, return "No title found"
    });

  return ogImage;
};
