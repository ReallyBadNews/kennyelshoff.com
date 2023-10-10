import fetcher from "@lib/fetcher";
import { AllStashes, Stash } from "@lib/stash";

import useSWR, { SWRConfiguration } from "swr";

interface UseStashProps extends SWRConfiguration {
  id?: string | null;
}

interface UseStashesProps extends SWRConfiguration {
  page?: number;
  limit?: number;
}

export const useStash = ({ id, ...config }: UseStashProps) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<Stash>(
    id ? `/api/stash/${id}` : null,
    fetcher,
    config,
  );

  return {
    stash: data,
    mutate,
    isLoading,
    isValidating,
    error,
  };
};

export const useStashes = ({
  page = 1,
  limit = 5,
  ...config
}: UseStashesProps) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<AllStashes>(
    `/api/stash?page=${page}&limit=${limit}`,
    fetcher,
    config,
  );

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    error,
  };
};
