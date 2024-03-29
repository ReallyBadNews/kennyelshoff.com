import fetcher from "@lib/fetcher";
import { Views } from "@lib/types";
import useSWR, { SWRConfiguration } from "swr";

interface UseViewsProps extends SWRConfiguration {
  slug: string;
}

export const useViews = ({ slug, ...config }: UseViewsProps) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<Views>(
    `/api/views${slug}`,
    fetcher,
    config,
  );

  return {
    views: data,
    mutate,
    isLoading,
    isValidating,
    error,
  };
};
