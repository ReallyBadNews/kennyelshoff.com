import { MDXComponents } from "@components/MDXComponents";
import Page from "@components/Page";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";
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
          slug: post.path,
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

  const imagePaths = await cloudinary.api
    .resources({
      type: "upload",
      prefix: `kenny/posts/${slug}`,
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
          type: curr.type,
        },
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
