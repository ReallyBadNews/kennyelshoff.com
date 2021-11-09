export type Frontmatter = {
  title: string;
  slug?: string;
  description?: string;
  poster?: string;
  downloads?: {
    name: string;
    url: string;
    external?: boolean;
  }[];
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
