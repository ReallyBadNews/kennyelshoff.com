import fetcher from "./fetcher";
import { UnsplashAPIResp } from "./types";

const UNSPLASH_URL = "https://api.unsplash.com";
const USER_STATS_ENDPOINT = "/users/reallybadnews/statistics";

export const getUnsplashStats = async () => {
  const stats = await fetcher<UnsplashAPIResp>(
    `${UNSPLASH_URL}${USER_STATS_ENDPOINT}`,
    {
      headers: new Headers({
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      }),
    }
  );

  return stats;
};
