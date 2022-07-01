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
// import { allStashes } from "contentlayer/generated";
import { Action, Priority, useRegisterActions } from "kbar";
import { getMDXComponent } from "mdx-bundler/client";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useStashes } from "@hooks/use-stash";
import { LinkButton } from "@components/Button";
import Link from "next/link";
import { StashPost } from "@components/StashPost";

/**
 * TODO:
 [x] - SSR data fetching should use same function as api endpoint
 [x] - Serialize the dates to ISO strings
 [x] - Add mdx to the api response as `mdxBody`
 */
export const getServerSideProps = async () => {
  const stashes = await getAllStashes();

  return {
    props: {
      fallbackData: stashes,
    },
  };
};

const Stash: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ fallbackData }) => {
  const { data, isLoading, isValidating } = useStashes({
    fallbackData,
    revalidateIfStale: true,
    revalidateOnMount: false,
  });

  console.log("[stash swr]", { isLoading, isValidating, data });

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
  sortByDate(data?.stashes || fallbackData.stashes).forEach((stash) => {
    actions.push({
      id: `stash-${stash.id}`,
      name: stash.title || "fix me",
      keywords: stash?.tags?.join(" "),
      section: "",
      parent: "search-stashes",
      perform: () => {
        return router.push(`/${stash.id}`);
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
      <Link href="/stash/new">
        <LinkButton size="2" variant="gray">
          Create new stash
        </LinkButton>
      </Link>
      <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
        {/* {data?.stashes.map((stash, index) => {
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
                  <NextLink href={`/stash/tags/${stash.slug}`}>
                    <time dateTime={stash.createdAt}>
                      {`— ${formatDate(stash.createdAt, "full")}`}
                    </time>
                  </NextLink>
                </Paragraph>
              </Stack>
              {index !== data.stashes.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })} */}
        {data?.stashes.map((stash, index) => {
          return (
            <Fragment key={stash.slug}>
              <StashPost {...stash} />
              {index !== data.stashes.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Stash;
