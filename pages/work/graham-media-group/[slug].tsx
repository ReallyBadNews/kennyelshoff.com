import { MDXComponents } from "@components/MDXComponents";
import Page from "@components/Page";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";
import { allWorks, Work } from "contentlayer/generated";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { getPlaiceholder } from "plaiceholder";
import { FC } from "react";
import { MDXImages } from "types";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allWorks.map((work) => {
      return {
        params: {
          slug: work.path,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const workPost = allWorks.find((p) => {
    return p.path === slug;
  }) as Work;

  const imagePaths = await cloudinary.api
    .resources({
      type: "upload",
      prefix: "kenny/work/gmg",
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
      const buffer = await fetch(image.src).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );

      const {
        base64,
        metadata: { height, width, format },
      } = await getPlaiceholder(buffer, { size: 10 });

      return {
        height,
        width,
        format,
        src: image.src,
        blurDataURL: base64,
        publicId: image.public_id,
      };
    }),
  ).then((values) => {
    const result = values.reduce<MDXImages>((acc, curr) => {
      return {
        ...acc,
        [curr.publicId]: {
          src: curr.publicId,
          width: curr.width,
          height: curr.height,
          blurDataURL: curr.blurDataURL,
          type: curr.format,
        },
      };
    }, {});

    return result;
  });

  return { props: { post: workPost, images } };
};

const GMGWork: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  images,
}) => {
  const Component = useMDXComponent(post.body.code);

  return (
    <Page description={post.description} title={post.title}>
      <Component components={MDXComponents(images)} />
    </Page>
  );
};

export default GMGWork;
