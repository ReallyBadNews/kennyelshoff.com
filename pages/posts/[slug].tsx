import { MDXComponents } from "@components/MDXComponents";
import Page from "@components/Page";
import { getAllImagePathsFromDir } from "@lib/images";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { getPlaiceholder } from "plaiceholder";
import { FC } from "react";
import { MDXImages } from "types";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((post) => {
      return {
        params: {
          slug: post.slug.replace("/posts/", ""),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const post = allPosts.find((p) => {
    return p.path === slug;
  }) as Post;

  const imagePaths = getAllImagePathsFromDir(`posts/${slug}`);

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

  return { props: { post, images } };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  images,
}) => {
  const Component = useMDXComponent(post.body.code);

  return (
    <Page
      date={post.date}
      description={post.description}
      readingTime={post.readingTime}
      slug={post.slug}
      title={post.title}
      type="post"
    >
      <Component components={MDXComponents(images)} />
    </Page>
  );
};

export default Layout;
