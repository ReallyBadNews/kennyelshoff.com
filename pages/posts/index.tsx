import { BlogPost } from "@components/BlogPost";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { getAllFrontmatter } from "@lib/mdx";
import { sortByDate } from "@lib/utils";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";

export const getStaticProps = async () => {
  const frontmatters = await getAllFrontmatter("posts");

  return { props: { frontmatters: sortByDate(frontmatters) } };
};

const Writing: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  frontmatters,
}) => {
  return (
    <Page
      description="I'm not writing it down to remember it later, I'm writing it down to remember it now."
      stackGap="$9"
      title="Writing"
    >
      <Stack css={{ stackGap: "$7" }}>
        {frontmatters.map((post, index) => {
          return (
            <Fragment key={post.slug}>
              <BlogPost
                date={post.date}
                description={post.description}
                slug={post.slug}
                title={post.title}
              />
              {index !== frontmatters.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Writing;
