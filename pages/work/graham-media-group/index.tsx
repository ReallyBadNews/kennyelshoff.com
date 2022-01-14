import { Badge } from "@components/Badge";
import { Gallery } from "@components/Gallery";
import { Heading } from "@components/Heading";
import { Image } from "@components/Image";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllImagePathsFromDir } from "@lib/images";
import { getAllFrontmatter } from "@lib/mdx";
import { formatDate } from "@lib/utils";
import { InferGetStaticPropsType } from "next";
import { getPlaiceholder } from "plaiceholder";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const frontmatter = await getAllFrontmatter("work/graham-media-group");

  const imagePaths = getAllImagePathsFromDir("work/gmg");

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src);

      return {
        ...img,
        blurDataURL: base64,
      };
    })
  ).then((values) => {
    // Remove height and width from each image since we're using layout="fill"
    return values.map(({ height, width, ...rest }) => {
      return rest;
    });
  });

  return { props: { images, frontmatter } };
};

const GMGWork: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
  frontmatter,
}) => {
  return (
    <Page
      description="Design Engineer building tools for storytellers and developers. Creating a community through local news"
      title="Graham Media Group"
    >
      <Stack css={{ stackGap: "$5", display: "block" }}>
        <Heading
          as="h2"
          fontFamily="mono"
          size="2"
          variant="contrast"
          weight="7"
        >
          Select Projects
        </Heading>
        <Separator css={{ my: "$3", "@bp1": { my: "$5" } }} size="2" />
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
                    <time dateTime={post.date}>
                      {formatDate(post.date, "medium")}
                    </time>
                  </Badge>
                </div>
              </Stack>
              {index !== frontmatter.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
        <Gallery aspectRatio="3 / 2">
          <Image
            {...images[0]}
            alt="Article page on clickondetroit.com"
            css={{ borderRadius: "$rg" }}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
          />
          <Image
            {...images[1]}
            alt="Home page on clickondetroit.com"
            css={{ borderRadius: "$rg" }}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
          />
          <Image
            {...images[2]}
            alt="Registration dialog on clickondetroit.com"
            css={{ borderRadius: "$rg" }}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
          />
        </Gallery>
      </Stack>
    </Page>
  );
};

export default GMGWork;
