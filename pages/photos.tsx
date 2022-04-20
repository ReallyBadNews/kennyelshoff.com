import { Box } from "@components/Box";
import { Grid } from "@components/Grid";
import { Image } from "@components/Image";
import Page from "@components/Page";
import { getUnsplashPhotos } from "@lib/unsplash";
import { InferGetStaticPropsType } from "next";
import { getPlaiceholder } from "plaiceholder";
import { FC } from "react";

export const getStaticProps = async () => {
  const photos = await getUnsplashPhotos();

  const images = await Promise.all(
    photos.map(async (photo) => {
      const { base64, img } = await getPlaiceholder(photo.urls.regular);

      return {
        ...img,
        blurDataURL: base64,
      };
    })
  );

  return {
    props: {
      images,
    },
  };
};

export const Photos: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
  return (
    <Page>
      <Grid
        // columns="2"
        css={{
          minColumnWidth: "$128",
          width: "100vw",
          px: "$3",
          position: "relative",
          left: "50%",
          marginLeft: "-50vw",
        }}
        gap="3"
      >
        {images.map((photo) => {
          return (
            <Box
              key={photo.src}
              css={{
                position: "relative",
                height: "700px",
                overflow: "hidden",
                borderRadius: "$md",
              }}
            >
              <Image
                {...photo}
                height={undefined}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                width={undefined}
              />
            </Box>
          );
        })}
      </Grid>
    </Page>
  );
};

export default Photos;
