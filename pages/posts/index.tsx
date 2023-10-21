import { BlogPost } from "@components/BlogPost";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { sortByDate } from "@lib/utils";
import { InferGetStaticPropsType } from "next";
import { Fragment } from "react";
import { allPosts } from "contentlayer/generated";

export const getStaticProps = async () => {
  return {
    props: { posts: sortByDate(allPosts) },
  };
};

const Writing: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <Page
      description="I'm not writing it down to remember it later, I'm writing it down to remember it now."
      stackGap="$9"
      title="Writing"
    >
      <Stack css={{ stackGap: "$7" }}>
        {posts.map((post, index) => {
          // If the post is a draft, don't render it unless we're in development
          if (process.env.NODE_ENV !== "development" && post.draft) return null;

          return (
            <Fragment key={post.slug}>
              <BlogPost
                date={post.date}
                description={post.description}
                draft={post.draft}
                slug={post.slug}
                title={post.title}
              />
              {index !== posts.length - 1 && <Separator size="2" />}
            </Fragment>
          );
        })}
      </Stack>
    </Page>
  );
};

export default Writing;
