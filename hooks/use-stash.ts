import fetcher from "@lib/fetcher";
import { getAllStashes } from "@lib/stash";
import { Stash } from "@prisma/client";
import useSWR, { SWRConfiguration } from "swr";

interface UseStashProps extends SWRConfiguration {
  id: string;
}

export const useStash = ({ id, ...config }: UseStashProps) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<Stash>(
    `/api/stash/${id}`,
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
  const { data, error, isLoading, isValidating } = useSWR<
    Awaited<ReturnType<typeof getAllStashes>>
  >(`/api/stash`, fetcher, config);

  return {
    data,
    isLoading,
    isValidating,
    error,
  };
};
