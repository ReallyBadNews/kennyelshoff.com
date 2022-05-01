import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { getAllImagePathsFromDir } from "@lib/images";
import { formatDate, slugify } from "@lib/utils";
import { allStashes, Stash } from "contentlayer/generated";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { FC } from "react";
import { MDXImages } from "types";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allStashes.map((stash) => {
      return {
        params: {
          slug: stash.path,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const stash = allStashes.find((s) => {
    return s.path === slug;
  }) as Stash;

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

  return { props: { stash, images } };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  stash,
  images,
}) => {
  const Component = useMDXComponent(stash.body.code);

  return (
    <Page
      description={stash.description}
      showHeader={false}
      title={stash.title}
    >
      {stash.url ? (
        <NextLink href={stash.url} showCitation>
          <Heading as="h1" weight="9">
            {stash.title}
          </Heading>
        </NextLink>
      ) : (
        <Heading as="h4" weight="9">
          {stash.title}
        </Heading>
      )}
      <Stack css={{ stackGap: "$2" }}>
        <Paragraph size="0" variant="contrast">
          <Text size="0" variant="subtle">
            {`Saved: `}
          </Text>
          <time dateTime={stash.date}>
            {`${formatDate(stash.date, "full")}`}
          </time>
        </Paragraph>
        {stash.tags && (
          <Stack css={{ stackGap: "$1", alignItems: "center" }} direction="row">
            <Text size="0" variant="subtle">
              {`Tags: `}
            </Text>
            {stash.tags.map((tag) => {
              return (
                <Link key={tag} href={`/stash/tags/${slugify(tag)}`} passHref>
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
