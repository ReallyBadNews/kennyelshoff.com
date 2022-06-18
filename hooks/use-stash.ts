import fetcher from "@lib/fetcher";
import { Stash } from "@prisma/client";
import useSWR, { SWRConfiguration } from "swr";

interface UseStashProps extends SWRConfiguration {
  id: string;
}

export const useStash = ({ id, ...config }: UseStashProps) => {
  const { data, error, isLoading, isValidating } = useSWR<Stash>(
    `/api/stash/${id}`,
    fetcher,
    config
  );

  return {
    stash: data,
    isLoading,
    isValidating,
    error,
  };
};

export const useStashes = ({ ...config }: SWRConfiguration) => {
  const { data, error, isLoading, isValidating } = useSWR<Stash[]>(
    `/api/stash`,
    fetcher,
    config
  );

  return {
    stashes: data,
    isLoading,
    isValidating,
    error,
  };
};
