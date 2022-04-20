import fetcher from "./fetcher";
import { UnsplashPhotosAPIResp, UnsplashStatsAPIResp } from "./types";

const UNSPLASH_URL = "https://api.unsplash.com";
const USER_STATS_ENDPOINT = "/users/reallybadnews/statistics";
const USER_PHOTOS_ENDPOINT = "/users/reallybadnews/photos";

export const getUnsplashStats = async () => {
  const stats = await fetcher<UnsplashStatsAPIResp>(
    `${UNSPLASH_URL}${USER_STATS_ENDPOINT}`,
    {
      headers: new Headers({
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      }),
    }
  );

  return stats;
};

export const getUnsplashPhotos = async () => {
  const photos = await fetcher<UnsplashPhotosAPIResp>(
    `${UNSPLASH_URL}${USER_PHOTOS_ENDPOINT}`,
    {
      headers: new Headers({
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      }),
    }
  );

  return photos;
};
