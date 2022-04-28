import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/StashPost";
import { sortByDate } from "@lib/utils";
import { allStashes } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  return {
    props: { stashes: sortByDate(allStashes) },
  };
};

const Stash: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  stashes,
}) => {
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
