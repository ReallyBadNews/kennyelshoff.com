export const getTitleFromUrl = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    return controller.abort();
  }, 2000); // timeout if it takes longer than 2 seconds

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
  }, 2000); // timeout if it takes longer than 2 seconds

  const description = await fetch(url, { signal: controller.signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.text();
    })
    .then((body: string) => {
      const match = body.match(/<meta name="description" content="(.*?)"\/>/g); // regular expression to parse contents of the description meta tag
      if (!match || typeof match[0] !== "string") return "No description found"; // if no title found, return "No title found"
      const matcheDescription = match[0].match(/content="(.*)"\/>/)?.pop();
      if (!matcheDescription) return "No description found";
      return matcheDescription;
    })
    .catch((err) => {
      console.error(err);
      return "No description found"; // if there's an error, return "No title found"
    });

  return description;
};
