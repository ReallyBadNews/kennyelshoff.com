import { Box } from "@components/Box";
import { Grid } from "@components/Grid";
import { Image } from "@components/Image";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { useUnsplashPhotos } from "@hooks/use-unsplash";
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
      fallback: photos,
      images,
    },
    revalidate: 10,
  };
};

export const Photos: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback,
  images,
}) => {
  const { data, isLoading } = useUnsplashPhotos({
    fallbackData: fallback,
    revalidateOnMount: false,
  });

  if (isLoading) return <Paragraph>Loading...</Paragraph>;

  const pictures = data || fallback;

  return (
    <Page>
      <Grid
        css={{
          minColumnWidth: "440px",
          width: "100vw",
          position: "relative",
          left: "50%",
          marginLeft: "-50vw",
          "@bp1": {
            px: "$3",
          },
        }}
        gap="3"
      >
        {pictures.map((photo, index) => {
          return (
            <Box
              key={photo.id}
              css={{
                position: "relative",
                height: "700px",
                overflow: "hidden",
                "@bp1": {
                  borderRadius: "$md",
                },
              }}
            >
              {images.length === pictures.length ? (
                <Image
                  {...images[index]}
                  height={undefined}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  width={undefined}
                />
              ) : (
                <Image
                  height={photo.height}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  src={photo.urls.regular}
                  width={photo.width}
                />
              )}
            </Box>
          );
        })}
      </Grid>
    </Page>
  );
};

export default Photos;
