import { sendDeleteRequest } from "@lib/fetcher";
import type { Stash } from "@lib/stash";
import { formatDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWRMutation from "swr/mutation";
import { Button, LinkButton } from "./Button";
import { Heading } from "./Heading";
import { MDXComponents } from "./MDXComponents";
import NextLink from "./NextLink";
import { Paragraph } from "./Paragraph";
import { Stack } from "./Stack";

export function StashPost({ id, title, date, url, slug, mdxBody }: Stash) {
  const { data: session } = useSession();

  const MDXContent = useMemo(() => {
    if (mdxBody) {
      return getMDXComponent(mdxBody);
    }
    return null;
  }, [mdxBody]);

  const { trigger } = useSWRMutation<Stash | null>(
    `/api/stash/${id}`,
    sendDeleteRequest
  );

  // TODO: Fix optimistic UI
  const deleteHandler = async () => {
    await trigger(null, {
      revalidate: true,
      populateCache: true,
    }).then((response) => {
      if (!response) throw new Error("No response from server");
    });
  };

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
      <Stack css={{ stackGap: "$4", alignItems: "baseline" }} direction="row">
        <Paragraph size="0">
          <NextLink href={`/stash/${slug}`} variant="subtle">
            <time dateTime={date}>{`— ${formatDate(date, "full")}`}</time>
          </NextLink>
        </Paragraph>
        {session?.user.role === "ADMIN" ? (
          <Stack css={{ stackGap: "$2" }} direction="row">
            <LinkButton href={`/stash/${slug}/edit`} variant="green">
              Edit
            </LinkButton>
            <Button variant="red" onClick={deleteHandler}>
              Delete
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}
