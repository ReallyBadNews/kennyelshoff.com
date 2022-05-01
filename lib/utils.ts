import sidSlugify, { Options } from "@sindresorhus/slugify";

export const slugify = (text: string, options?: Options): string => {
  return sidSlugify(text, {
    customReplacements: [
      ["TypeScript", "typescript"],
      ["JavaScript", "javascript"],
    ],
    ...options,
  });
};

export const formatDate = (
  date: string | number | Date,
  format: "xshort" | "short" | "medium" | "long" | "full" = "short"
): string => {
  const dateFormats: Record<typeof format, Intl.DateTimeFormatOptions> = {
    xshort: {
      month: "numeric",
      day: "numeric",
    },
    short: {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    },
    medium: {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    long: {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    full: {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  };

  const options = dateFormats[format];
  options.timeZone = "America/Detroit";

  // TODO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#performance
  return new Date(date).toLocaleDateString("en-us", options);
};

export const wrap = (min: number, max: number, absolute: number): number => {
  const rangeSize = max - min;
  return ((((absolute - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export const isExternalLink = (url: string) => {
  if (url.startsWith("/") || url.startsWith("#")) {
    return false;
  }
  return true;
};

export const sortByDate = <T extends { date: string }>(
  arr: Array<T>
): Array<T> => {
  return arr.sort((a, b) => {
    return Number(new Date(b.date)) - Number(new Date(a.date));
  });
};

export type GroupByYear<T> = Record<string, Array<T>>;
export const groupByYear = <
  T extends {
    date: string;
  }
>(
  arr: Array<T>
) => {
  return arr
    .sort((a, b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    })
    .reduce((acc, current) => {
      const year = new Date(current.date).getFullYear().toString();
      if (acc[year] !== undefined) {
        acc[year].push(current);
      } else {
        acc[year] = [current];
      }

      return acc;
    }, {} as GroupByYear<T>);
};

export const getHostname = (url: string) => {
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch (error) {
    throw new Error("Invalid url");
  }
  return hostname;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffleArray<T extends any[]>(array: T): T {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
