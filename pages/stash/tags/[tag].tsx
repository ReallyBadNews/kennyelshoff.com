import { InlineCode } from "@components/Code";
import { Heading } from "@components/Heading";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/Stash/StashPost";
import { getAllStashes, getStashesByTag } from "@lib/stash";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { FC, Fragment } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const { stashes: allStashes } = await getAllStashes();

  // Get the slugs for all tags
  const paths = Array.from(
    new Set(
      allStashes.map(({ tags }) => {
        return tags.map(({ slug }) => {
          return slug;
        });
      }),
    ),
  )
    .filter(Boolean)
    .flat()
    .map((slug) => {
      return { params: { tag: slug } };
    });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { tag = "" } = {} }) => {
  const { stashes: allStashes } = await getStashesByTag(tag);
  let nonSlugifiedTag: string = tag;

  if (allStashes.length > 0) {
    const matchedTag = allStashes[0].tags.find((t) => {
      return t.slug === tag;
    })?.name;

    if (matchedTag) {
      nonSlugifiedTag = matchedTag;
    }
  }

  return {
    props: {
      items: allStashes,
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
        {title ? (
          <Heading size="4">
            {`No stashes found with the tag `}
            <InlineCode>{title}</InlineCode>
          </Heading>
        ) : null}
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
