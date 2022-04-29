import fetcher from "@lib/fetcher";
import { Views } from "@lib/types";
import useSWR from "swr";

export const useViews = (slug: string) => {
  const { data, error } = useSWR<Views>(`/api/views${slug}`, fetcher);

  return {
    views: data,
    isLoading: !error && typeof data === "undefined",
    isError: error,
  };
};
