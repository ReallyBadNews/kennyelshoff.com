/* eslint-disable no-param-reassign */
import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkSlug from "remark-slug";
import remarkUnwrapImages from "remark-unwrap-images";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import { Frontmatter } from "types";
import rehypeMetaAttribute from "./rehype-meta-attribute";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "content");

export const postsPath = path.join(ROOT_PATH, "content/posts");
export const stashPath = path.join(ROOT_PATH, "content/stash");
export const gmgWorkPath = path.join(
  ROOT_PATH,
  "content/work/graham-media-group"
);

const content = {
  posts: postsPath,
  stash: stashPath,
  "work/graham-media-group": gmgWorkPath,
};

export const getMdxBySlug = async (
  directory: keyof typeof content,
  fileName: string
) => {
  const mdxSource = fs.readFileSync(
    path.join(content[directory], `${fileName}.mdx`),
    "utf8"
  );

  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: mdxSource,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        remarkSlug,
        remarkUnwrapImages,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any;
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypePrism,
        rehypeMetaAttribute,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any;
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
    date: frontmatter.date,
    frontmatter: {
      ...frontmatter,
      slug: `${directory}/${fileName}`,
    },
    code,
    readingTime: readingTime(mdxSource),
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
