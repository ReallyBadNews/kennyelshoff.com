import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllMdx } from "@lib/mdx";
import { formatDate, sortByDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const stashes = await getAllMdx("stash");

  return { props: { stashes: sortByDate(stashes) } };
};

const Stash: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  stashes,
}) => {
  return (
    <Page
      description="Bookmarks, articles, tweets, notes and other miscellaneous tidbits I feel the need to enumerate so maybe I can remember where I saved it this time"
      stackGap="$9"
      title="Stash"
    >
      <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
        {stashes.map(({ frontmatter, code }, index) => {
          const Component = getMDXComponent(code);
          return (
            <Fragment key={frontmatter.slug}>
              <Stack
                as="article"
                css={{ position: "relative", stackGap: "$4" }}
              >
                {/* @ts-expect-error TODO: use contentlayer for typings */}
                <NextLink href={frontmatter.url} target="_blank" showCitation>
                  <Heading as="h4" size="2" weight="7">
                    {frontmatter.title}
                  </Heading>
                </NextLink>
                <Component components={MDXComponents} />
                <Paragraph size="0" variant="subtle">
                  <NextLink href={`/${frontmatter.slug}`}>
                    <time dateTime={frontmatter.date}>
                      {`— ${formatDate(frontmatter.date, "full")}`}
                    </time>
                  </NextLink>
                </Paragraph>
              </Stack>
              {index !== stashes.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Stash;
