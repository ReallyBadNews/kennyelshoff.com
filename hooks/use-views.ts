import fetcher from "@lib/fetcher";
import { Views } from "@lib/types";
import useSWR from "swr";

export const useViews = (id: string) => {
  const { data, error } = useSWR<Views>(`/api/views/${id}`, fetcher);

  return {
    views: data,
    isLoading: !error && !data,
    isError: error,
  };
};
