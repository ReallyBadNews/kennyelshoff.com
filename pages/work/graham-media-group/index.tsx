import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllFrontmatter } from "@lib/mdx";
import { formatDate } from "@lib/utils";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const projects = await getAllFrontmatter("work/graham-media-group");

  return { props: { projects } };
};

const GMGWork: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
}) => {
  return (
    <Page
      description="Design & code, building tools for storytellers, marketers and fellow developers. Creating a community through local news."
      title="Graham Media Group"
    >
      <Stack css={{ stackGap: "$7" }} marginCollapse>
        <Heading as="h2" size="2" variant="contrast" weight="7">
          Select Projects
        </Heading>
        <Separator css={{ my: "$3", "@bp1": { my: "$5" } }} size="2" />
        {projects.map((post, index) => {
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
                    <time dateTime={post.date}>
                      {formatDate(post.date, "medium")}
                    </time>
                  </Badge>
                </div>
              </Stack>
              {index !== projects.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default GMGWork;
