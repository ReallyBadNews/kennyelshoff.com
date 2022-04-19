import fetcher from "@lib/fetcher";
import { UnsplashStats } from "@lib/types";
import useSWR from "swr";

export const useUnsplash = () => {
  const { data, error } = useSWR<UnsplashStats>(`/api/unsplash`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
