import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { getAllImagePathsFromDir } from "@lib/images";
import { getAllFrontmatter, getMdxBySlug } from "@lib/mdx";
import { formatDate } from "@lib/utils";
import { MDXImages } from "types";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
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

  const imagePaths = getAllImagePathsFromDir("stash");

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src);

      return {
        ...img,
        blurDataURL: base64,
      };
    })
  ).then((values) => {
    const result = values.reduce<MDXImages>((acc, curr) => {
      return {
        ...acc,
        [curr.src]: curr,
      };
    }, {});

    return result;
  });

  return { props: { frontmatter, code, images } };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatter,
  code,
  images,
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
        <NextLink href={frontmatter.url} showCitation>
          <Heading as="h1" weight="9">
            {frontmatter.title}
          </Heading>
        </NextLink>
      ) : (
        <Heading as="h4" weight="9">
          {frontmatter.title}
        </Heading>
      )}
      <Stack css={{ stackGap: "$2" }}>
        <Paragraph size="0" variant="contrast">
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
      <Component components={MDXComponents(images)} />
    </Page>
  );
};

export default Layout;
