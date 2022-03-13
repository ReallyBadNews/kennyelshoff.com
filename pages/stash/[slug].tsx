import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { getAllFrontmatter, getMdxBySlug } from "@lib/mdx";
import { formatDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { FC, useMemo } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const frontmatters = await getAllFrontmatter("stash");

  return {
    paths: frontmatters.map((frontmatter) => {
      return {
        params: {
          slug: frontmatter.slug?.replace("stash/", ""),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const { frontmatter, code } = await getMdxBySlug("stash", slug);

  return { props: { frontmatter, code } };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatter,
  code,
}) => {
  const Component = useMemo(() => {
    return getMDXComponent(code);
  }, [code]);

  return (
    <Page
      description={frontmatter.description}
      showHeader={false}
      title={frontmatter.title}
    >
      {frontmatter.url ? (
        <NextLink href={frontmatter.url} target="_blank" showCitation>
          <Heading as="h1" size="2" weight="9">
            {frontmatter.title}
          </Heading>
        </NextLink>
      ) : (
        <Heading as="h4" size="1" weight="7">
          {frontmatter.title}
        </Heading>
      )}
      <Stack css={{ stackGap: "$2" }}>
        <Paragraph size="0" variant="orange">
          <Text size="0" variant="subtle">
            {`Saved: `}
          </Text>
          <time dateTime={frontmatter.date}>
            {`${formatDate(frontmatter.date, "full")}`}
          </time>
        </Paragraph>
        {frontmatter.tags && (
          <Stack css={{ stackGap: "$1", alignItems: "center" }} direction="row">
            <Text size="0" variant="subtle">
              {`Tags: `}
            </Text>
            {frontmatter.tags.map((tag) => {
              return (
                <Link key={tag} href={`/stash/tagged/${tag}`} passHref>
                  <Badge as="a" size="1" variant="gray">
                    {tag}
                  </Badge>
                </Link>
              );
            })}
          </Stack>
        )}
      </Stack>
      <Component components={MDXComponents} />
    </Page>
  );
};

export default Layout;
