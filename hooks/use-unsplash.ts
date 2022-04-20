import fetcher from "@lib/fetcher";
import { UnsplashPhotosAPIResp, UnsplashStats } from "@lib/types";
import useSWR from "swr";

export const useUnsplashStats = () => {
  const { data, error } = useSWR<UnsplashStats>(`/api/unsplash/stats`, fetcher);

  return {
    data,
    isLoading: !error && typeof data === "undefined",
    isError: error,
  };
};

export const useUnsplashPhotos = () => {
  const { data, error } = useSWR<UnsplashPhotosAPIResp>(
    `/api/unsplash/photos`,
    fetcher
  );

  return {
    data,
    isLoading: !error && typeof data === "undefined",
    isError: error,
  };
};
