import { formatDate } from "@lib/utils";
import { Stash } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Heading } from "./Heading";
import { MDXComponents } from "./MDXComponents";
import NextLink from "./NextLink";
import { Paragraph } from "./Paragraph";
import { Stack } from "./Stack";

export function StashPost({ title, date, url, slug, body }: Stash) {
  const MDXContent = useMDXComponent(body.code);

  return (
    <Stack as="article" css={{ position: "relative", stackGap: "$4" }}>
      <Heading as="h4" size="2">
        {url ? (
          <NextLink css={{ fontWeight: "inherit" }} href={url} showCitation>
            {title}
          </NextLink>
        ) : (
          title
        )}
      </Heading>
      <MDXContent components={MDXComponents()} />
      <Paragraph size="0" variant="subtle">
        <NextLink href={slug}>
          <time dateTime={date}>{`— ${formatDate(date, "full")}`}</time>
        </NextLink>
      </Paragraph>
    </Stack>
  );
}
