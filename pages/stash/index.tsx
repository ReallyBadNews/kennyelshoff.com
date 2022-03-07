import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllFrontmatter } from "@lib/mdx";
import { formatDate, groupByYear } from "@lib/utils";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Fragment } from "react";

export const getStaticProps = async () => {
  // const mdx = await getAllMdx("stash");
  const frontmatters = await getAllFrontmatter("stash");
  const groupedFrontmatter = groupByYear(frontmatters);

  return { props: { frontmatters: groupedFrontmatter } };
};

const Stash: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatters,
}) => {
  return (
    <Page
      description="Bookmarks, save for later, and other miscellaneous tidbits I feel the need to save for later"
      stackGap="$9"
      title="Stash"
      showDivider
    >
      {Object.entries(frontmatters)
        .reverse()
        .map(([year, posts]) => {
          return (
            <Stack key={year} css={{ stackGap: "$5" }}>
              <Stack css={{ stackGap: "$3" }}>
                <Heading>{year}</Heading>
                <Separator size="full" />
              </Stack>
              <Stack css={{ stackGap: "$5" }}>
                {posts.map((post, index) => {
                  return (
                    <Fragment key={post.slug}>
                      <Stack
                        as="article"
                        css={{ position: "relative", stackGap: "$4" }}
                      >
                        <Heading as="h3" size="1" weight="7">
                          {/* @ts-expect-error TODO: use contentlayer for typings */}
                          <NextLink href={post.url} showCitation>
                            {post.title}
                          </NextLink>
                        </Heading>
                        <Stack css={{ stackGap: "$3" }}>
                          {post.tags && (
                            <Stack css={{ stackGap: "$1" }} direction="row">
                              {post.tags.map((tag) => {
                                return (
                                  <Link
                                    key={tag}
                                    href={`/stash/tagged/${tag}`}
                                    passHref
                                  >
                                    <Badge as="a" size="1" variant="gray">
                                      {tag}
                                    </Badge>
                                  </Link>
                                );
                              })}
                            </Stack>
                          )}
                          <Paragraph size="0" variant="subtle">
                            <NextLink href={`/${post.slug}`}>
                              <time dateTime={post.date}>
                                {`— ${formatDate(post.date, "full")}`}
                              </time>
                            </NextLink>
                          </Paragraph>
                        </Stack>
                      </Stack>
                      {index !== posts.length - 1 && <Separator size="2" />}
                    </Fragment>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
    </Page>
  );
};

export default Stash;
