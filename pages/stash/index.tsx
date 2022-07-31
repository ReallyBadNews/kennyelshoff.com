import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/StashPost";
import { useStashes } from "@hooks/use-stash";
import { getAllStashes } from "@lib/stash";
import { sortByDate } from "@lib/utils";
import { Action, Priority, useRegisterActions } from "kbar";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

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
      <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
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
