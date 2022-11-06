import type { Stash } from "@lib/stash";
import { formatDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Button, LinkButton } from "../Button";
import { Heading } from "../Heading";
import { MDXComponents } from "../MDXComponents";
import NextLink from "../NextLink";
import { Paragraph } from "../Paragraph";
import { Stack } from "../Stack";

interface StashProps extends Omit<Stash, "image"> {
  deleteHandler?: (id: string) => void | Promise<void>;
}

export function StashPost({
  id,
  title,
  date,
  url,
  slug,
  mdxBody,
  deleteHandler,
}: StashProps) {
  const { data: session } = useSession();

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
      <Stack
        css={{
          stackGap: "$4",
          alignItems: "baseline",
          justifyContent: "space-between",
          height: "$6",
        }}
        direction="row"
      >
        <Paragraph size="0">
          <NextLink href={`/stash/${slug}`} variant="subtle">
            <time dateTime={date}>{`— ${formatDate(date, "full")}`}</time>
          </NextLink>
        </Paragraph>
        {session?.user.role === "ADMIN" &&
        typeof deleteHandler === "function" ? (
          <Stack css={{ stackGap: "$2" }} direction="row">
            <LinkButton href={`/stash/edit/${id}`} variant="green">
              Edit
            </LinkButton>
            <Button
              variant="red"
              onClick={() => {
                return deleteHandler(id);
              }}
            >
              Delete
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}
