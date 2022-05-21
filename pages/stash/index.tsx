import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/StashPost";
import { sortByDate } from "@lib/utils";
import { allStashes } from "contentlayer/generated";
import { Action, Priority, useRegisterActions } from "kbar";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const getStaticProps = async () => {
  return {
    props: { stashes: sortByDate(allStashes) },
  };
};

const Stash: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  stashes,
}) => {
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
      <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
        {stashes.map((stash, index) => {
          return (
            <Fragment key={stash.slug}>
              <StashPost {...stash} />
              {index !== stashes.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Stash;
