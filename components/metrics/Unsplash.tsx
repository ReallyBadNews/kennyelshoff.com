import { Heading } from "@components/Heading";
import { Stack } from "@components/Stack";
import { Paragraph } from "@components/Paragraph";
import { useUnsplashStats } from "@hooks/use-unsplash";

export default function UnsplashCard() {
  const { data, isLoading } = useUnsplashStats();

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
