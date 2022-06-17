import { Text } from "@components/Text";
import { useViews } from "@hooks/use-views";
import { useEffect } from "react";
import { Post } from "contentlayer/generated";
import useSWRMutation from "swr/mutation";

async function sendRequest(url: RequestInfo | URL, { arg }: any) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

export default function ViewCounter({ slug }: Pick<Post, "slug">) {
  const { views, isLoading } = useViews({ slug });
  const { trigger } = useSWRMutation(`/api/views${slug}`, sendRequest);

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Text size="0" variant="subtle">
      <Text size="0">{isLoading ? "——" : views?.total.toLocaleString()}</Text>
      {` views`}
    </Text>
  );
}
