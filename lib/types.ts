import { Prisma, Stash } from "@prisma/client";
import { Session } from "next-auth";

export type Views = {
  total: number;
};

export interface UnsplashStats {
  downloads: number;
  views: number;
}

export type UnsplashPhotosAPIResp = {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  categories: string[];
  likes: number;
}[];

export interface UnsplashStatsAPIResp {
  id: string;
  username: string;
  downloads: Downloads;
  views: Views;
}

export interface Downloads {
  total: number;
  historical: Historical;
}

export interface Historical {
  change: number;
  average: number;
  resolution: string;
  quantity: number;
  values: Values[];
}

export interface Values {
  date: string;
  value: number;
}

export interface UnsplashViews {
  total: number;
  historical: Historical;
}

export type CreateOrUpdateStashInput = Stash & {
  tags?: string[];
  author?: Session["user"];
};

const stashWithTags = Prisma.validator<Prisma.StashArgs>()({
  include: { tags: true },
});

const stashWithAuthor = Prisma.validator<Prisma.StashArgs>()({
  include: { author: true },
});

export type StashWithTags = Prisma.StashGetPayload<typeof stashWithTags>;
export type StashWithAuthor = Prisma.StashGetPayload<typeof stashWithAuthor>;
export type StashWithTagsAndAuthor = Prisma.StashGetPayload<
  typeof stashWithTags & typeof stashWithAuthor
>;
