import { MDXComponents } from "@components/MDXComponents";
import Page from "@components/Page";
import { getAllFrontmatter, getMdxBySlug } from "@lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { FC, useMemo } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const frontmatters = await getAllFrontmatter("stash");

  return {
    paths: frontmatters.map((frontmatter) => {
      return {
        params: {
          slug: frontmatter.slug?.replace("stash/", ""),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug = "" } = {} }) => {
  const { frontmatter, code } = await getMdxBySlug("stash", slug);

  return { props: { frontmatter, code } };
};

const Layout: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatter,
  code,
}) => {
  const Component = useMemo(() => {
    return getMDXComponent(code);
  }, [code]);

  return (
    <Page description={frontmatter.description} title={frontmatter.title}>
      <Component components={MDXComponents} />
    </Page>
  );
};

export default Layout;
