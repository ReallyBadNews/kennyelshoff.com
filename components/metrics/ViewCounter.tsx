import { Text } from "@components/Text";
import { useViews } from "@hooks/use-views";
import { sendRequest } from "@lib/fetcher";
import { Views } from "@lib/types";
import { Post } from "contentlayer/generated";
import { useEffect } from "react";

export default function ViewCounter({ slug }: Pick<Post, "slug">) {
  const { views, mutate, isLoading } = useViews({ slug });

  useEffect(() => {
    const updateView = async () => {
      await mutate(sendRequest<Views>(`/api/views${slug}`), {
        revalidate: false,
      });
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
