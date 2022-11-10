import { Gallery } from "@components/Gallery";
import { Heading } from "@components/Heading";
import { Link } from "@components/Link";
import { List } from "@components/List";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { MDXImages } from "types";

// export const getStaticProps = async () => {
//   const imagePaths = getAllImagePathsFromDir("work/wdiv");

//   const images = await Promise.all(
//     imagePaths.map(async (src) => {
//       const { base64, img } = await getPlaiceholder(src);

//       return {
//         ...img,
//         blurDataURL: base64,
//       };
//     })
//   ).then((values) => {
//     return values;
//   });

//   return { props: { images } };
// };

export const getStaticProps = async () => {
  const imagePaths = await cloudinary.api
    .resources({
      type: "upload",
      prefix: "kenny/work/wdiv",
    })
    .then((res: ResourceApiResponse) => {
      return res.resources.map((resource) => {
        return {
          public_id: resource.public_id,
          src: resource.secure_url,
        };
      });
    });

  const images = await Promise.all(
    imagePaths.map(async (image) => {
      const { base64, img } = await getPlaiceholder(image.src);

      return {
        ...img,
        blurDataURL: base64,
        publicId: image.public_id,
      };
    })
  );

  return { props: { images } };
};

export default function Local4Work({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page
      description="Motion and brand designer in the Creative Services department supporting the newsroom, marketing, and sales teams"
      title="WDIV-TV / Local 4"
    >
      <Stack css={{ stackGap: "$7" }} marginCollapse>
        <Stack as="dl" css={{ stackGap: "$4" }}>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Time Period
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              June 2014 – December 2018
            </Text>
          </Stack>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Position
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              Motion & Brand Designer
            </Text>
          </Stack>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Tools
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              After Effects, Cinema 4D, Photoshop, Illustrator, Premiere Pro
            </Text>
          </Stack>
        </Stack>
        <Heading as="h2">Projects</Heading>
        <Separator
          css={{ mt: "$3", mb: "-$4", "@bp1": { my: "$5" } }}
          size="2"
        />
        <List>
          <List.Item>
            Produced high fidelity motion graphics in a fast-paced newsroom
            environment, directly contributing to WDIV s #1 rating among local
            news stations in the Detroit market.
          </List.Item>
          <List.Item>
            {`Designed and created brand assets including logo, broadcast package, and show open. for weekday lifestyle show  `}
            <Link href="https://www.clickondetroit.com/live-in-the-d/">
              Live in the D
            </Link>
            .
          </List.Item>
          <List.Item>
            Created elements and packages that were adopted throughout the seven
            station group.
          </List.Item>
          <List.Item>
            Developed branding and packaging for big events like America’s
            Thanksgiving Parade and The Ford Fireworks.
          </List.Item>
        </List>
        <Heading as="h2">Gallery</Heading>
        <Separator
          css={{ mt: "$3", mb: "-$4", "@bp1": { my: "$5" } }}
          size="2"
        />
        <Gallery aspectRatio="16 / 9" css={{ position: "relative" }}>
          {images.map((image) => {
            return (
              <Image
                key={image.src}
                alt="WDIV-TV / Local 4"
                blurDataURL={image.blurDataURL}
                height={undefined}
                placeholder="blur"
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 6rem), (max-width: 800px) 702px"
                src={image.publicId}
                style={{ objectFit: "contain" }}
                width={undefined}
                fill
              />
            );
          })}
        </Gallery>
      </Stack>
    </Page>
  );
}
