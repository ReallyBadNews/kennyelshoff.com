import { LoginButton } from "@components/LoginButton";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
// import { StashPost } from "@components/StashPost";
// import { useAllStashes } from "@hooks/use-stash";
import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import { Paragraph } from "@components/Paragraph";
import { getAllStashes } from "@lib/stash";
import { formatDate, sortByDate } from "@lib/utils";
import { allStashes } from "contentlayer/generated";
import { Action, Priority, useRegisterActions } from "kbar";
import { getMDXComponent } from "mdx-bundler/client";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

/**
 * TODO:
 [ ] - SSR data fetching should use same function as api endpoint
 [ ] - Serialize the dates to ISO strings
 [ ] - Add mdx to the api response as `mdxBody`
 */
export const getServerSideProps = async () => {
  const stashes = await getAllStashes();

  return {
    props: {
      stashes: sortByDate(allStashes),
      api: stashes,
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
          const MDXContent = stash.mdxBody
            ? getMDXComponent(stash.mdxBody)
            : null;
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
