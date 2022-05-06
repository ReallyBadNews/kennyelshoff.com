import { InlineCode } from "@components/Code";
import { Heading } from "@components/Heading";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/StashPost";
import { slugify, sortByDate } from "@lib/utils";
import { allStashes } from "contentlayer/generated";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { FC, Fragment } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array.from(
      new Set(
        allStashes
          .map((stash) => {
            return stash.tags;
          })
          .flat()
      )
    )
      .filter(Boolean)
      .map((tag) => {
        return {
          params: {
            tag: slugify(tag ?? ""),
          },
        };
      }),
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { tag = "" } = {} }) => {
  const filteredItems = allStashes.filter((item) => {
    const slugifiedTags = item.tags?.map((stashTag) => {
      return slugify(stashTag ?? "");
    });

    return slugifiedTags?.includes(tag) ? item.tags : undefined;
  });

  // Get the non slugified tag from the array index
  const tagIndex = filteredItems[0].tags
    ?.map((stashTag) => {
      return slugify(stashTag ?? "");
    })
    .indexOf(tag) as number;

  const nonSlugifiedTag = filteredItems[0]?.tags?.[tagIndex];

  return {
    props: {
      items: sortByDate(filteredItems),
      title: nonSlugifiedTag,
    },
  };
};

const StashTags: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  items,
  title,
}) => {
  if (!items?.length) {
    return (
      <Page showHeader={false} title={`Stashes tagged with "${title}"`}>
        <p>{`No stashes found with the tag '${title}'.`}</p>
      </Page>
    );
  }

  return (
    <Page showHeader={false} title={`Stashes tagged with ${title}`}>
      {title ? (
        <Heading size="4">
          {`Stashes tagged with `}
          <InlineCode>{title}</InlineCode>
        </Heading>
      ) : null}
      <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
        {items.map((stash, index) => {
          return (
            <Fragment key={stash.slug}>
              <StashPost {...stash} />
              {index !== items.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default StashTags;
