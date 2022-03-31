import { MDXComponents } from "@components/MDXComponents";
import Page from "@components/Page";
import { getAllImagePathsFromDir } from "@lib/images";
import { getAllFrontmatter, getMdxBySlug } from "@lib/mdx";
import { MDXImages } from "types";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { getPlaiceholder } from "plaiceholder";
import { FC, useMemo } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const frontmatters = await getAllFrontmatter("posts");

  return {
    paths: frontmatters.map((frontmatter) => {
      return {
        params: {
          slug: frontmatter.slug?.replace("posts/", ""),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const { frontmatter, code, readingTime } = await getMdxBySlug("posts", slug);

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

  return { props: { frontmatter, code, images, readingTime } };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatter,
  code,
  images,
  // readingTime,
}) => {
  const Component = useMemo(() => {
    return getMDXComponent(code);
  }, [code]);

  return (
    <Page description={frontmatter.description} title={frontmatter.title}>
      <Component components={MDXComponents(images)} />
    </Page>
  );
};

export default Layout;
