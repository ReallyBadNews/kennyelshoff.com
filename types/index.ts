export type MDXImages = {
  [key: string]: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
  };
};

export type ComponentMap = import("mdx/types").MDXComponents;
