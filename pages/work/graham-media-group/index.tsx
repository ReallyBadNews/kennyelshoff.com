import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { getAllFrontmatter } from "@lib/mdx";
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
        <Stack as="dl" css={{ stackGap: "$4" }}>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Start Date
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              December 2018
            </Text>
          </Stack>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Position
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              Design Engineer
            </Text>
          </Stack>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Tools
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              TypeScript, React, ArcXP, styled-components, NextJS
            </Text>
          </Stack>
        </Stack>
        <Heading as="h2" size="2" variant="contrast" weight="7">
          Select Projects
        </Heading>
        <Separator
          css={{ mt: "$3", mb: "-$4", "@bp1": { my: "$5" } }}
          size="2"
        />
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
