export type Frontmatter = {
  date: string;
  description?: string;
  slug?: string;
  title: string;
};

export type MDXImages = {
  [key: string]: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
  };
};
