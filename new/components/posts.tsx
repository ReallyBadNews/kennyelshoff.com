import Link from "next/link";

import { formatDate, getPosts } from "@/lib/mdx";

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
            className="flex w-full flex-col justify-between md:flex-row"
            href={`/writing/${post.slug}`}
          >
            <p className="not-prose tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="not-prose tracking-tight text-neutral-900 dark:text-neutral-100">
              {post.metadata.title}
            </p>
          </Link>
        ))}
    </div>
  );
}
