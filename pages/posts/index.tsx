import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllFrontmatter } from "@lib/mdx";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const frontmatter = await getAllFrontmatter("posts");

  return { props: { frontmatter } };
};

const Writing: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatter,
}) => {
  return (
    <Page
      description="I'm not writing it down to remember it later, I'm writing it down to remember it now."
      stackGap="$7"
      title="Writing"
    >
      <Stack css={{ stackGap: "$7" }}>
        {frontmatter.map((post, index) => {
          return (
            <Fragment key={post.slug}>
              <Stack
                as="article"
                css={{ position: "relative", stackGap: "$1" }}
              >
                <Heading as="h3" size="1" weight="7">
                  <NextLink
                    href={`/${post.slug}`}
                    outline="hover"
                    variant="transparent"
                  >
                    {post.title}
                  </NextLink>
                </Heading>
                <Paragraph fontFamily="mono" size="1" variant="gray">
                  {post.description}
                </Paragraph>
                <div>
                  <Badge size="1" variant="gray">
                    <time dateTime={post.date}>{post.date}</time>
                  </Badge>
                </div>
              </Stack>
              {index !== frontmatter.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Writing;
