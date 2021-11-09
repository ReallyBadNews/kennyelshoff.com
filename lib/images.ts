import glob from "glob";

export const getAllImagePaths = (path: string): string[] => {
  return glob.sync(`./public/img/${path}/*.{jpg,png}`).map((file) => {
    const separator = "/";
    const fileArr = file.split(separator);

    const filePath = fileArr
      .slice(fileArr.indexOf("public") + 1, fileArr.length)
      .join(separator);

    return [separator, filePath].join("");
  });
};
