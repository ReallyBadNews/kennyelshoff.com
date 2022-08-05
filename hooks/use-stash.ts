import fetcher from "@lib/fetcher";
import { AllStashes, Stash } from "@lib/stash";

import useSWR, { SWRConfiguration } from "swr";

interface UseStashProps extends SWRConfiguration {
  id?: string;
}

export const useStash = ({ id, ...config }: UseStashProps) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<Stash>(
    id ? `/api/stash/${id}` : null,
    fetcher,
    config
  );

  return {
    stash: data,
    mutate,
    isLoading,
    isValidating,
    error,
  };
};

export const useStashes = ({ ...config }: SWRConfiguration) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<AllStashes>(
    `/api/stash`,
    fetcher,
    config
  );

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    error,
  };
};
