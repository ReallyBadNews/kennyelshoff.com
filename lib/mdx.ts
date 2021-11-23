/* eslint-disable no-param-reassign */
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
// import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkUnwrapImages from "remark-unwrap-images";
import { Frontmatter } from "types";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "data");

// the front matter and content of all mdx files based on `DATA_PATH`
export const getAllFrontmatter = (fromPath: string): Frontmatter[] => {
  const PATH = path.join(DATA_PATH, fromPath);
  const paths = glob.sync(`${PATH}/*.mdx`);

  return paths.map((filePath) => {
    const source = fs.readFileSync(path.join(filePath), "utf8");
    const { data } = matter(source);

    return {
      ...(data as Frontmatter),
      slug: filePath.replace(`${DATA_PATH}/`, "").replace(".mdx", ""),
    } as Frontmatter;
  });
};

export const getMdxBySlug = async (
  basePath: string,
  slug?: string | string[]
) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const mdxSource = fs.readFileSync(
    path.join(DATA_PATH, basePath, `${slug}.mdx`),
    "utf8"
  );
  const { frontmatter, code } = await bundleMDX({
    source: mdxSource,
    cwd: path.join(DATA_PATH, basePath),
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkSlug,
        remarkUnwrapImages,
      ];

      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
      };

      return options;
    },
  });

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
    } as Frontmatter,
    code,
  };
};
