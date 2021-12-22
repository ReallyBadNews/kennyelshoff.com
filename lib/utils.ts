export const formatDate = (
  date: string | number | Date,
  format: "xshort" | "short" | "medium" | "long" | "full" = "short"
) => {
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