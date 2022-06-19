import { prisma } from "@lib/prisma";
import { LoginButton } from "@components/LoginButton";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
// import { StashPost } from "@components/StashPost";
// import { useAllStashes } from "@hooks/use-stash";
import { formatDate, sortByDate } from "@lib/utils";
import { allStashes } from "contentlayer/generated";
import { Action, Priority, useRegisterActions } from "kbar";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import { Paragraph } from "@components/Paragraph";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { MDXComponents } from "@components/MDXComponents";
import { useStashes } from "@hooks/use-stash";

/**
 * TODO:
 * fetch `stashes` from Prisma via the same function used
 * to populate the `api/stashes` endpoint.
 * serialize the dates and generate mdx on the server
 * and consume via the endpoint
 */
export const getServerSideProps = async () => {
  const stashes = await prisma.stash.findMany({
    include: {
      tags: true,
    },
  });

  const stashMdxBodys = await Promise.all(
    stashes.map(async (stash) => {
      if (!stash.body) return null;
      const mdxBody = await bundleMDX({ source: stash.body });
      return mdxBody;
    })
  );

  const serializedStashes = stashes.map((stash, index) => {
    return {
      ...stash,
      createdAt: stash.createdAt.toISOString(),
      updatedAt: stash.updatedAt.toISOString(),
      ...(stash.body ? { body: stashMdxBodys[index]?.code } : undefined),
    };
  });

  console.log("serializedStashes", serializedStashes);

  return {
    props: {
      stashes: sortByDate(allStashes),
      api: serializedStashes,
    },
  };
};

const Stash: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ stashes, api }) => {
  const router = useRouter();
  const actions: Action[] = [
    {
      id: "search-stashes",
      name: "Search Stashes",
      keywords: "stash posts",
      shortcut: ["?"],
      priority: Priority.HIGH,
    },
  ];
  // Map through stashes and add them to kbar actions
  sortByDate(allStashes).forEach((stash) => {
    actions.push({
      id: `stash-${stash._id}`,
      name: stash.title,
      keywords: stash?.tags?.join(" "),
      section: "",
      parent: "search-stashes",
      perform: () => {
        return router.push(`/${stash.slug}`);
      },
    });
  });

  useRegisterActions(actions);

  return (
    <Page
      description="Bookmarks, articles, tweets, notes and other miscellaneous tidbits I feel the need to enumerate. Maybe I can remember where I saved it this time."
      stackGap="$9"
      title="Stash"
    >
      <LoginButton />
      <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
        {api.map((stash, index) => {
          const MDXContent = stash.body ? getMDXComponent(stash.body) : null;
          return (
            <Fragment key={stash.id}>
              <Stack
                as="article"
                css={{ position: "relative", stackGap: "$4" }}
              >
                <Heading as="h4" size="2">
                  {stash.url ? (
                    <NextLink
                      css={{ fontWeight: "inherit" }}
                      href={stash.url}
                      showCitation
                    >
                      {stash.title}
                    </NextLink>
                  ) : (
                    stash.title
                  )}
                </Heading>
                {MDXContent ? (
                  <MDXContent components={MDXComponents()} />
                ) : null}
                <Paragraph size="0" variant="subtle">
                  <NextLink href={stash.createdAt}>
                    <time dateTime={stash.createdAt}>
                      {`— ${formatDate(stash.createdAt, "full")}`}
                    </time>
                  </NextLink>
                </Paragraph>
              </Stack>
              {index !== api.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
        {/* {stashes.map((stash, index) => {
          return (
            <Fragment key={stash.slug}>
              <StashPost {...stash} />
              {index !== stashes.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })} */}
      </Stack>
    </Page>
  );
};

export default Stash;
