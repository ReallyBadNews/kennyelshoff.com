import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { getAllFrontmatter } from "@lib/mdx";
import { formatDate, sortByDate } from "@lib/utils";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const frontmatters = await getAllFrontmatter("posts");

  return { props: { frontmatters: sortByDate(frontmatters) } };
};

const Writing: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatters,
}) => {
  return (
    <Page
      description="I'm not writing it down to remember it later, I'm writing it down to remember it now."
      stackGap="$9"
      title="Writing"
    >
      <Stack css={{ stackGap: "$7" }}>
        {frontmatters.map((post, index) => {
          return (
            <Fragment key={post.slug}>
              <Stack
                as="article"
                css={{ position: "relative", stackGap: "$1" }}
              >
                <NextLink
                  href={`/${post.slug}`}
                  outline="hover"
                  variant="transparent"
                >
                  <Heading as="h3" size="2">
                    {post.title}
                  </Heading>
                </NextLink>
                <Text
                  css={{ lineHeight: "$snug" }}
                  fontFamily="mono"
                  size="2"
                  variant="gray"
                >
                  {post.description}
                </Text>
                <div>
                  <Badge size="1" variant="gray">
                    <time dateTime={post.date}>
                      {formatDate(post.date, "medium")}
                    </time>
                  </Badge>
                </div>
              </Stack>
              {index !== frontmatters.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Writing;
