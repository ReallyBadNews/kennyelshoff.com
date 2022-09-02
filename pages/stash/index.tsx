import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/StashPost";
import { useStashes } from "@hooks/use-stash";
import type { Stash } from "@lib/stash";
import { getAllStashes } from "@lib/stash";
import { sortByDate } from "@lib/utils";
import { Action, Priority, useRegisterActions } from "kbar";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const stashes = await getAllStashes();

  return {
    props: {
      fallbackData: stashes,
    },
  };
};

const StashPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallbackData,
}) => {
  const { data, mutate, isLoading, isValidating } = useStashes({
    fallbackData,
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

  const deleteHandler = async (id: string) => {
    await mutate(async (prevData) => {
      await fetch(`/api/stash/${id}`, {
        method: "DELETE",
      });

      // filter the list, and return it with the updated item
      const filteredStashes = prevData?.stashes.filter((stash) => {
        return stash.id !== id;
      }) as Stash[];

      return {
        stashes: filteredStashes,
        total: filteredStashes.length,
        page: prevData?.page || 1,
      };
    });
  };

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
              <StashPost deleteHandler={deleteHandler} {...stash} />
              {index !== data.stashes.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default StashPage;
