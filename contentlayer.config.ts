// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeMetaAttribute from "./lib/rehype-meta-attribute";

const readTime = defineNestedType(() => {
  return {
    name: "ReadingTime",
    fields: {
      text: { type: "string", required: true },
      time: { type: "string", required: true },
      wods: { type: "number", required: true },
      minutes: { type: "number", required: true },
    },
  };
});

export const Post = defineDocumentType(() => {
  return {
    name: "Post",
    filePathPattern: "posts/**/*.mdx",
    contentType: "mdx",
    fields: {
      title: {
        type: "string",
        description: "The title of the post",
        required: true,
      },
      description: {
        type: "string",
        description: "The description of the post",
        required: true,
      },
      date: {
        type: "date",
        description: "The date of the post",
        required: true,
      },
    },
    computedFields: {
      path: {
        type: "string",
        resolve: (post) => {
          return post._raw.sourceFileName.split(".")[0];
        },
      },
      slug: {
        type: "string",
        description:
          'The URL path of this page absolute to site root. For example "/posts/helo-wold"',
        resolve: (post) => {
          return `/${post._raw.flattenedPath}`;
        },
      },
      readingTime: {
        type: "nested",
        of: readTime,
        resolve: (post) => {
          return readingTime(post.body.raw);
        },
      },
    },
  };
});

export const Stash = defineDocumentType(() => {
  return {
    name: "Stash",
    filePathPattern: "stash/**/*.mdx",
    contentType: "mdx",
    fields: {
      title: {
        type: "string",
        description: "The title of the stash",
        required: true,
      },
      description: {
        type: "string",
        description: "The description of the stash",
        required: false,
      },
      url: {
        type: "string",
        description: "The url of the stash",
        required: false,
      },
      date: {
        type: "date",
        description: "The date of the stash",
        required: true,
      },
      tags: {
        type: "list",
        of: { type: "string" },
        description: "The tags of the stash",
        required: false,
      },
    },
    computedFields: {
      path: {
        type: "string",
        resolve: (stash) => {
          return stash._raw.sourceFileName.split(".")[0];
        },
      },
      slug: {
        type: "string",
        description:
          'The URL path of this page absolute to site root. For example "/posts/helo-wold"',
        resolve: (stash) => {
          return `/${stash._raw.flattenedPath}`;
        },
      },
    },
  };
});

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Stash],
  mdx: {
    rehypePlugins: [
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
    ],
    remarkPlugins: [remarkGfm, remarkSlug, remarkUnwrapImages],
  },
});
