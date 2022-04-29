import { MDXComponents } from "@components/MDXComponents";
import Page from "@components/Page";
import { getAllImagePathsFromDir } from "@lib/images";
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
    const result = values.reduce<MDXImages>((acc, curr) => {
      return {
        ...acc,
        [curr.src]: curr,
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
