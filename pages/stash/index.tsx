import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import Page from "@components/Page";
import { Stack } from "@components/Stack";
import { StashList } from "@components/Stash/StashList";
import { Text } from "@components/Text";
import { useStashes } from "@hooks/use-stash";
import type { Stash } from "@lib/stash";
import { getAllStashes } from "@lib/stash";
import { sortByDate } from "@lib/utils";
import { Action, Priority, useRegisterActions } from "kbar";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

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
        return router.push(`/stash/${stash.slug}`);
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
      <Stack
        css={{
          stackGap: "$2",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        direction="row"
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
              setPageIndex(pageIndex - 1);
              return window.scrollTo(0, 0);
            }}
          >
            Previous
          </Button>
          <Text size="0">{`${data?.page} / ${totalPages}`}</Text>
          <Button
            disabled={data?.page === totalPages}
            onClick={() => {
              setPageIndex(pageIndex + 1);
              return window.scrollTo(0, 0);
            }}
          >
            Next
          </Button>
        </Stack>
        <Stack
          css={{
            stackGap: "$2",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          direction="row-reverse"
        >
          <Label htmlFor="stash-count">Items per page</Label>
          <Input
            css={{ alignSelf: "flex-end", width: "6ch" }}
            id="stash-count"
            min={1}
            size="1"
            type="number"
            value={pageLimit}
            onChange={(e) => {
              return setPageLimit(Number(e.target.value));
            }}
          />
        </Stack>
      </Stack>
    </Page>
  );
};

export default StashPage;
