export type Frontmatter = {
  title: string;
  description?: string;
  url?: string;
  date: string;
  slug?: string;
  tags?: string[];
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
