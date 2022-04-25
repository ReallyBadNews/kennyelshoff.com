import fetcher from "@lib/fetcher";
import { UnsplashPhotosAPIResp, UnsplashStats } from "@lib/types";
import useSWR, { SWRConfiguration } from "swr";

export const useUnsplashStats = (config?: SWRConfiguration) => {
  const { data, error } = useSWR<UnsplashStats>(
    `/api/unsplash/stats`,
    fetcher,
    config
  );

  return {
    data,
    isLoading: !error && typeof data === "undefined",
    isError: error,
  };
};

export const useUnsplashPhotos = (config?: SWRConfiguration) => {
  const { data, error } = useSWR<UnsplashPhotosAPIResp>(
    `/api/unsplash/photos`,
    fetcher,
    config
  );

  return {
    data,
    isLoading: !error && typeof data === "undefined",
    isError: error,
  };
};
