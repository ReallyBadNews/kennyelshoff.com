import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "@lib/fetcher";
import { Views } from "@lib/types";
import { Text } from "@components/Text";

export default function ViewCounter({ slug }: { slug: string }) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);

  // eslint-disable-next-line no-new-wrappers
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () => {
      return fetch(`/api/views/${slug}`, {
        method: "POST",
      });
    };

    registerView();
  }, [slug]);

  return (
    <Text size="0" variant="subtle">
      <Text size="0">{`${views > 0 ? views.toLocaleString() : "–––"}`}</Text>
      {` views`}
    </Text>
  );
}
