import glob from "glob";

/**
 * Get all images from a directory in `public/images/path/*.{jpg,png}`
 */
export const getAllImagePathsFromDir = (path: string): string[] => {
  return glob.sync(`./public/images/${path}/*.{jpg,png}`).map((file) => {
    const separator = "/";
    const fileArr = file.split(separator);

    const filePath = fileArr
      .slice(fileArr.indexOf("public") + 1, fileArr.length)
      .join(separator);

    return [separator, filePath].join("");
  });
};
