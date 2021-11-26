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
export const DATA_PATH = path.join(ROOT_PATH, "content");

export const postsPath = path.join(ROOT_PATH, "content/posts");
export const stashPath = path.join(ROOT_PATH, "content/stash");

const content = {
  posts: postsPath,
  stash: stashPath,
};

/**
 * Get frontmatter of all mdx files from a directory in `./content`
 */
export const getAllFrontmatter = async (type: keyof typeof content) => {
  const PATH = path.join(DATA_PATH, type);
  const paths = glob.sync(`${PATH}/*.mdx`);

  const frontmatter = await Promise.all(
    paths.map(async (filePath) => {
      const source = fs.readFileSync(path.join(filePath), "utf8");
      const { data } = matter(source);

      return {
        ...(data as Frontmatter),
        slug: filePath.replace(`${DATA_PATH}/`, "").replace(".mdx", ""),
      } as Frontmatter;
    })
    // sort the posts by date in reverse chronological order
  ).then((data) => {
    return data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  return frontmatter;
};

export const getMdxBySlug = async (
  directory: keyof typeof content,
  fileName: string
) => {
  const mdxSource = fs.readFileSync(
    path.join(DATA_PATH, directory, `${fileName}.mdx`),
    "utf8"
  );
  const { frontmatter, code } = await bundleMDX({
    source: mdxSource,
    cwd: path.join(DATA_PATH, directory),
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
      slug: fileName,
    } as Frontmatter,
    code,
  };
};

// get all mdx files from a directory in `./content`'
export const getAllMdx = async (type: keyof typeof content) => {
  const items = await Promise.all(
    fs.readdirSync(content[type]).map(async (item) => {
      return getMdxBySlug(type, item.replace(".mdx", ""));
    })
  );
  return items;
};
