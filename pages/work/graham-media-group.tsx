import { Grid } from "@components/Grid";
import { Heading } from "@components/Heading";
import { Image } from "@components/Image";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllImagePathsFromDir } from "@lib/images";
import { InferGetStaticPropsType } from "next";
import { getPlaiceholder } from "plaiceholder";

export const getStaticProps = async () => {
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
    return values;
  });

  return { props: { images } };
};

const GMGWork: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
  return (
    <Page
      description="Design Engineer building tools for storytellers and developers. Creating a community through local news"
      title="Graham Media Group"
    >
      <Stack css={{ stackGap: "$3", display: "block" }}>
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
        <Grid columns={1} gap="5">
          <figure>
            <Image
              {...images[0]}
              css={{ borderRadius: "$rg" }}
              layout="responsive"
              placeholder="blur"
            />
            <Paragraph
              as="figcaption"
              css={{ mt: "$1" }}
              size="0"
              variant="gray"
            >
              Header & Account Menu
            </Paragraph>
          </figure>
          <figure>
            <Image
              {...images[1]}
              css={{ borderRadius: "$rg" }}
              layout="responsive"
              placeholder="blur"
            />
            <Paragraph
              as="figcaption"
              css={{ mt: "$1" }}
              size="0"
              variant="gray"
            >
              Article Page
            </Paragraph>
          </figure>
        </Grid>
      </Stack>
    </Page>
  );
};

export default GMGWork;
