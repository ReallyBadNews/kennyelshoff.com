import { Badge } from "@components/Badge";
import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { getAllImagePathsFromDir } from "@lib/images";
import { getAllStashes, getStashBySlug } from "@lib/stash";
import { formatDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { FC, useMemo } from "react";
import { MDXImages } from "types";

export const getStaticPaths: GetStaticPaths = async () => {
  const { stashes: allStashes } = await getAllStashes();
  return {
    paths: allStashes.map((stash) => {
      return {
        params: {
          slug: stash.slug,
        },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const stash = await getStashBySlug(slug);

  // if (!stash) {
  //   return {
  //     notFound: true,
  //   };
  // }

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

  return {
    props: {
      stash,
      images,
    },
    revalidate: 10,
  };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  stash,
  images,
}) => {
  const MDXContent = useMemo(() => {
    if (stash?.mdxBody) {
      return getMDXComponent(stash.mdxBody);
    }
    return null;
  }, [stash?.mdxBody]);

  if (!stash) return null;

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
        {stash.createdAt ? (
          <Paragraph size="0" variant="contrast">
            <Text size="0" variant="subtle">
              {`Saved: `}
            </Text>
            <time dateTime={stash.createdAt}>
              {`${formatDate(stash.createdAt, "full")}`}
            </time>
          </Paragraph>
        ) : null}
        {stash.tags && stash.tags.length > 0 && (
          <Stack css={{ stackGap: "$1", alignItems: "center" }} direction="row">
            <Text size="0" variant="subtle">
              {`Tags: `}
            </Text>
            {stash.tags.map((tag) => {
              return (
                <Link key={tag.id} href={`/stash/tags/${tag.slug}`} passHref>
                  <Badge as="a" size="1" variant="gray">
                    {tag.name}
                  </Badge>
                </Link>
              );
            })}
          </Stack>
        )}
      </Stack>
      {MDXContent ? <MDXContent components={MDXComponents(images)} /> : null}
    </Page>
  );
};

export default Layout;
