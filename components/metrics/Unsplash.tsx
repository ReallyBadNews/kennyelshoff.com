import { Heading } from "@components/Heading";
import { Stack } from "@components/Stack";
import { Paragraph } from "@components/Paragraph";
import { useUnsplash } from "@hooks/use-unsplash";

// import MetricCard from "components/metrics/Card";

export default function UnsplashCard() {
  const { data, isLoading } = useUnsplash();

  // const link = "https://unsplash.com/@reallybadnews";

  return (
    <Stack css={{ stackGap: "$3" }}>
      <Heading>Unsplash Stats</Heading>
      <Paragraph>
        Views:
        {isLoading ? "——" : ` ${data?.views.toLocaleString()}`}
      </Paragraph>
      <Paragraph>
        Downloads:
        {isLoading ? "——" : ` ${data?.downloads.toLocaleString()}`}
      </Paragraph>
    </Stack>
  );
}
