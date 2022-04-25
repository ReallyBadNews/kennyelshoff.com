import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { Dialog, DialogContent, DialogTrigger } from "@components/Dialog";
import { Grid } from "@components/Grid";
import { Image } from "@components/Image";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { useUnsplashPhotos } from "@hooks/use-unsplash";
import { getUnsplashPhotos } from "@lib/unsplash";
import { InferGetStaticPropsType } from "next";
import { getPlaiceholder } from "plaiceholder";
import { FC, useState } from "react";

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

  const [zoomedPhoto, setZoomedPhoto] = useState<number | null>(null);

  if (isLoading) return <Paragraph>Loading...</Paragraph>;
  const pictures = data || fallback;

  return (
    <Page>
      <Dialog allowPinchZoom>
        <Grid
          css={{
            minColumnWidth: "440px",
            width: "100vw",
            position: "relative",
            left: "50%",
            marginLeft: "-50vw",
            "@bp1": {
              px: "$2",
            },
          }}
          gap="2"
        >
          <DialogContent
            css={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              width: "$full",
              height: "$full",
            }}
            forceMount
            onCloseAutoFocus={(e) => {
              return e.preventDefault();
            }}
          >
            <Box
              css={{ position: "relative", height: "$full", width: "$full" }}
            >
              <Image
                {...images[zoomedPhoto as number]}
                css={{ borderRadius: "$sm" }}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                src={fallback[zoomedPhoto as number]?.urls.full}
              />
            </Box>
          </DialogContent>
          {pictures.map((photo, index) => {
            return (
              <DialogTrigger key={photo.id} asChild>
                <Button
                  css={{
                    cursor: "zoom-in",
                    position: "relative",
                    height: "700px",
                    overflow: "hidden",
                    "@bp1": {
                      borderRadius: "$md",
                    },
                  }}
                  onClick={() => {
                    return setZoomedPhoto(index);
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
                      src={photo.urls.regular}
                      width={photo.width}
                    />
                  )}
                </Button>
              </DialogTrigger>
            );
          })}
        </Grid>
      </Dialog>
    </Page>
  );
};

export default Photos;
