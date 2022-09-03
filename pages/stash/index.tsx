import { Button } from "@components/Button";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/StashPost";
import { Text } from "@components/Text";
import { useStashes } from "@hooks/use-stash";
import type { Stash } from "@lib/stash";
import { getAllStashes } from "@lib/stash";
import { sortByDate } from "@lib/utils";
import { Action, Priority, useRegisterActions } from "kbar";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

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
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);

  const { data, mutate, isLoading, isValidating } = useStashes({
    page: pageIndex,
    limit: pageLimit,
    fallbackData: pageIndex === 1 ? fallbackData : undefined,
    revalidateIfStale: true,
  });

  console.log("[stash swr]", { isLoading, isValidating, data });

  const totalPages = data?.total ? Math.ceil(data.total / pageLimit) : 0;

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
      stackGap="$4"
      title="Stash"
    >
      <Stack
        css={{
          stackGap: "$2",
          justifyContent: "flex-end",
          alignItems: "baseline",
        }}
        direction="row"
      >
        <Button
          disabled={pageIndex === 1}
          onClick={() => {
            return setPageIndex(pageIndex - 1);
          }}
        >
          Previous
        </Button>
        <Text size="0">{`${data?.page} / ${totalPages}`}</Text>
        <Button
          disabled={data?.page === totalPages}
          onClick={() => {
            return setPageIndex(pageIndex + 1);
          }}
        >
          Next
        </Button>
      </Stack>
      <StashList
        deleteHandler={deleteHandler}
        fallbackData={pageIndex === 1 ? fallbackData : undefined}
        pageIndex={pageIndex}
        pageLimit={pageLimit}
      />
      <div style={{ display: "none" }}>
        <StashList
          deleteHandler={deleteHandler}
          pageIndex={pageIndex + 1}
          pageLimit={pageLimit}
        />
      </div>
    </Page>
  );
};

const StashList = ({
  pageIndex = 1,
  pageLimit = 5,
  deleteHandler,
  fallbackData,
}) => {
  const { data } = useStashes({
    page: pageIndex,
    limit: pageLimit,
    fallbackData,
  });

  return (
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
  );
};

export default StashPage;
