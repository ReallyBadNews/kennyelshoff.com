/* eslint-disable no-param-reassign */
import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkSlug from "remark-slug";
import remarkUnwrapImages from "remark-unwrap-images";
import { Frontmatter } from "types";
import rehypeHighlightCode from "./rehype-highlight-code";
import rehypeMetaAttribute from "./rehype-meta-attribute";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "content");

export const postsPath = path.join(ROOT_PATH, "content/posts");
export const stashPath = path.join(ROOT_PATH, "content/stash");

const content = {
  posts: postsPath,
  stash: stashPath,
};

interface GetMdxBySlug {
  (type: keyof typeof content, slug: string): Promise<{
    frontmatter: Frontmatter;
    code: string;
  }>;
}

export const getMdxBySlug: GetMdxBySlug = async (
  directory,
  fileName
): Promise<{ frontmatter: Frontmatter; code: string }> => {
  const mdxSource = fs.readFileSync(
    path.join(DATA_PATH, directory, `${fileName}.mdx`),
    "utf8"
  );
  const { frontmatter, code } = await bundleMDX<Frontmatter>({
    source: mdxSource,
    cwd: path.join(DATA_PATH, directory),
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkSlug,
        remarkUnwrapImages,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMetaAttribute,
        rehypeHighlightCode,
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
      ...frontmatter,
      slug: `${directory}/${fileName}`,
    },
    code,
  };
};

/**
 * Get frontmatter of all mdx files from a directory in `./content`
 */
export const getAllFrontmatter = async (type: keyof typeof content) => {
  const items = await Promise.all(
    fs.readdirSync(content[type]).map(async (item) => {
      const { frontmatter } = await getMdxBySlug(
        type,
        item.replace(".mdx", "")
      );
      return frontmatter;
    })
  );
  return items;
};

/**
 * Get all mdx files from a directory in `./content`'
 */
export const getAllMdx = async (type: keyof typeof content) => {
  const items = await Promise.all(
    fs.readdirSync(content[type]).map(async (item) => {
      return getMdxBySlug(type, item.replace(".mdx", ""));
    })
  );
  return items;
};
