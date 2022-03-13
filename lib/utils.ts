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
