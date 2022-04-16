import { Text } from "@components/Text";
import { useViews } from "@hooks/use-views";
import { useEffect } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const { views, isLoading } = useViews(slug);

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
      <Text size="0">{isLoading ? "–––" : views?.total.toLocaleString()}</Text>
      {` views`}
    </Text>
  );
}
