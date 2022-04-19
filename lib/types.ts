export type Views = {
  total: number;
};

export interface UnsplashStats {
  downloads: number;
  views: number;
}

export interface UnsplashAPIResp {
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
