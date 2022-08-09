import { Badge } from "@components/Badge";
import { Button, LinkButton } from "@components/Button";
import { Heading } from "@components/Heading";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { useStash, useStashes } from "@hooks/use-stash";
import { getAllImagePathsFromDir } from "@lib/images";
import { getAllStashes, getStashBySlug, Stash } from "@lib/stash";
import { formatDate } from "@lib/utils";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  };
};

const StashDetailPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  stash: fallbackData,
  images,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: allStashes, mutate: mutateAllStashes } = useStashes({
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  const { stash, mutate } = useStash({
    id: fallbackData?.id,
    fallbackData,
    revalidateOnMount: false,
  });

  const MDXContent = useMemo(() => {
    if (stash?.mdxBody) {
      return getMDXComponent(stash.mdxBody);
    }
    return null;
  }, [stash?.mdxBody]);

  const deleteHandler = async (id: string) => {
    await mutate(async () => {
      return undefined;
    });

    await mutateAllStashes(async () => {
      // this API returns the updated data
      await fetch(`/api/stash/${id}`, {
        method: "DELETE",
      });

      // filter the list, and return it with the updated item
      const filteredStashes = allStashes?.stashes.filter((post) => {
        return post.id !== id;
      }) as Stash[];

      return { stashes: filteredStashes, total: filteredStashes?.length || 0 };
    });

    router.replace("/stash");
  };

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
      <Stack
        css={{
          stackGap: "$3",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
        direction="row"
      >
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
            <Stack
              css={{ stackGap: "$1", alignItems: "center" }}
              direction="row"
            >
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
        {session?.user.role === "ADMIN" ? (
          <Stack css={{ stackGap: "$2" }} direction="row">
            <Link href={`/stash/edit/${stash.id}`}>
              <LinkButton variant="green">Edit</LinkButton>
            </Link>
            <Button
              variant="red"
              onClick={() => {
                return deleteHandler(stash.id);
              }}
            >
              Delete
            </Button>
          </Stack>
        ) : null}
      </Stack>
      {MDXContent ? <MDXContent components={MDXComponents(images)} /> : null}
    </Page>
  );
};

export default StashDetailPage;
