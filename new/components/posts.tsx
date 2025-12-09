import Link from "next/link";

import { formatDate, getPosts, Post } from "@/lib/mdx";

export function BlogPosts() {
  let allBlogs = getPosts();

  return (
    <div className="flex flex-col gap-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="no-underline"
          >
            <BlogPost post={post} />
            {/* <p className="not-prose tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="not-prose tracking-tight text-neutral-900 dark:text-neutral-100">
              {post.metadata.title}
            </p> */}
          </Link>
        ))}
    </div>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LUoVcW4y8xg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
function BlogPost({ post }: { post: Post }) {
  return (
    <li className="flex flex-col items-start sm:flex-row sm:items-baseline sm:justify-between">
      <span className="font-medium">
        {formatDate(post.metadata.publishedAt)}
      </span>
      <span className="my-2 flex-grow border-t border-dotted border-current sm:my-0" />
      <span className="font-medium">{post.metadata.title}</span>
    </li>
  );
}
