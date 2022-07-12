import { Text } from "@components/Text";
import { sendRequest } from "@lib/fetcher";
import { Views } from "@lib/types";
import { Post } from "contentlayer/generated";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

export default function ViewCounter({ slug }: Pick<Post, "slug">) {
  const {
    data: views,
    trigger,
    isMutating,
  } = useSWRMutation<Views>(`/api/views${slug}`, sendRequest);

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Text size="0" variant="subtle">
      <Text size="0">
        {isMutating || !views ? "——" : views.total.toLocaleString("en-US")}
      </Text>
      {` views`}
    </Text>
  );
}
