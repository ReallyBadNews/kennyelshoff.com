import { Text } from "@components/Text";
import { useViews } from "@hooks/use-views";
import { Views } from "@lib/types";
import { Post } from "contentlayer/generated";
import { useEffect } from "react";

async function sendRequest(url: RequestInfo | URL, arg?: any) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  const views: Views = await response.json();

  return views;
}

export default function ViewCounter({ slug }: Pick<Post, "slug">) {
  const { views, mutate, isLoading } = useViews({ slug });

  useEffect(() => {
    const updateView = async () => {
      await mutate(sendRequest(`/api/views${slug}`), { revalidate: false });
    };

    updateView();
  }, [mutate, slug]);

  return (
    <Text size="0" variant="subtle">
      <Text size="0">
        {isLoading || !views ? "——" : views.total.toLocaleString("en-US")}
      </Text>
      {` views`}
    </Text>
  );
}
