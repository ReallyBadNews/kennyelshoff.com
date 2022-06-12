import { useViews } from "@hooks/use-views";
import { formatDate } from "@lib/utils";
import { Post } from "contentlayer/generated";
import { Badge } from "./Badge";
import { Heading } from "./Heading";
import NextLink from "./NextLink";
import { Stack } from "./Stack";
import { Text } from "./Text";

export function BlogPost({
  title,
  description,
  date,
  slug,
}: Pick<Post, "title" | "description" | "date" | "slug">) {
  const { views, isLoading } = useViews(slug);

  return (
    <Stack as="article" css={{ position: "relative", stackGap: "$1" }}>
      <NextLink href={slug} outline="hover" variant="transparent">
        <Heading as="h2" size="2">
          {title}
        </Heading>
      </NextLink>
      <Text
        css={{ lineHeight: "$snug" }}
        fontFamily="mono"
        size="2"
        variant="gray"
      >
        {description}
      </Text>
      <Stack
        css={{ stackGap: "$2", mt: "$3", alignItems: "center" }}
        direction="row"
      >
        <Badge size="1" variant="gray">
          <time dateTime={date}>{formatDate(date, "medium")}</time>
        </Badge>
        <Text size="0" variant="subtle">
          •
        </Text>
        <Text size="0" variant="subtle">
          <Text size="0">
            {isLoading ? "–––" : views?.total.toLocaleString("en-us")}
          </Text>
          {` views`}
        </Text>
      </Stack>
    </Stack>
  );
}
