import { Badge } from "@components/Badge";
import { MDXComponents } from "@components/MDXComponents";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllMdx } from "@lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const mdx = await getAllMdx("stash");

  return { props: { mdx } };
};

const Stash: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  mdx,
}) => {
  return (
    <Page
      description="Bookmarks, save for later, and other miscellaneous tidbits I feel the need to save for later"
      title="Stash"
    >
      <Stack css={{ stackGap: "$7" }}>
        {mdx.map(({ frontmatter, code }, index) => {
          const Component = getMDXComponent(code);
          return (
            <Fragment key={frontmatter.slug}>
              <Stack
                as="article"
                css={{ position: "relative", stackGap: "$3" }}
              >
                <Component components={MDXComponents} />
                <Paragraph fontFamily="mono" size="1" variant="gray">
                  {frontmatter.description}
                </Paragraph>
                <NextLink href={`${frontmatter.slug}`} variant="transparent">
                  <Badge size="1" variant="gray">
                    <time dateTime={frontmatter.date}>{frontmatter.date}</time>
                  </Badge>
                </NextLink>
              </Stack>
              {index !== mdx.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Stash;
