import { Button } from "@components/Button";
import { Dialog, DialogContent, DialogTrigger } from "@components/Dialog";
import { Grid } from "@components/Grid";
import Image from "@components/Image";
import UnsplashStats from "@components/metrics/Unsplash";
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
      const buffer = await fetch(photo.urls.regular).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );

      const { base64, metadata } = await getPlaiceholder(buffer, { size: 10 });

      return {
        ...metadata,
        src: photo.urls.regular,
        blurDataURL: base64,
      };
    }),
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
      <UnsplashStats />
      <Dialog>
        <DialogContent
          css={{
            maxHeight: "96vh",
            maxWidth: "96vw",
            width: "$full",
            height: "$full",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            "& img": {
              width: "$full",
              height: "$full",
              objectFit: "contain",
            },
          }}
          onCloseAutoFocus={(e) => {
            return e.preventDefault();
          }}
        >
          <Image
            {...images[zoomedPhoto as number]}
            alt={pictures[zoomedPhoto as number]?.description || ""}
            height={undefined}
            loader={null}
            placeholder="blur"
            sizes="96vw"
            src={fallback[zoomedPhoto as number]?.urls.regular}
            width={undefined}
            fill
          />
        </DialogContent>
        <Grid
          css={{
            minColumnWidth: "1fr",
            width: "100vw",
            position: "relative",
            left: "50%",
            marginLeft: "-50vw",
            "@bp1": {
              minColumnWidth: "440px",
              px: "$3",
            },
          }}
          gap="3"
        >
          {pictures.map((photo, index) => {
            return (
              <DialogTrigger key={photo.id} asChild>
                <Button
                  css={{
                    cursor: "zoom-in",
                    position: "relative",
                    height: "700px",
                    overflow: "hidden",
                    borderRadius: "$none",
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
                      alt={photo.description}
                      height={undefined}
                      loader={null}
                      placeholder="blur"
                      sizes="(max-width: 640px) 100vw, (max-width: 927px) calc(100vw - 2rem), (max-width: 1383px) calc(50vw - 3rem), calc(33vw - 4rem)"
                      style={{ objectFit: "cover" }}
                      width={undefined}
                      fill
                    />
                  ) : (
                    <Image
                      alt={photo.description}
                      height={photo.height}
                      loader={null}
                      sizes="(max-width: 640px) 100vw, (max-width: 927px) calc(100vw - 2rem), (max-width: 1383px) calc(50vw - 3rem), calc(33vw - 4rem)"
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
