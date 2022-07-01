import type { Stash } from "@lib/stash";
import { formatDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { Heading } from "./Heading";
import { MDXComponents } from "./MDXComponents";
import NextLink from "./NextLink";
import { Paragraph } from "./Paragraph";
import { Stack } from "./Stack";

// TODO: Add slug to the `Stash` model and generate it on creation
export function StashPost({ title, date, url, slug, mdxBody }: Stash) {
  const MDXContent = useMemo(() => {
    if (mdxBody) {
      return getMDXComponent(mdxBody);
    }
    return null;
  }, [mdxBody]);

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
      {MDXContent ? <MDXContent components={MDXComponents()} /> : null}
      <Paragraph size="0" variant="subtle">
        <NextLink href={`/stash/${slug}`}>
          <time dateTime={date}>{`— ${formatDate(date, "full")}`}</time>
        </NextLink>
      </Paragraph>
    </Stack>
  );
}
