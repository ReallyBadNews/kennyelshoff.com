import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { baseUrl } from "../../sitemap";
import { formatDate, getPosts } from "@/lib/mdx";

export async function generateStaticParams() {
  let posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  let post = getPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  {
    /* <main className="flex-1">
  <div className="container flex flex-col space-y-2">
    <article className="pt-6">
      <div className="space-y-1">
        <h2 className="font-mono text-lg tracking-tighter">Writing</h2>
      </div>
    </article>
  </div>
</main>; */
  }

  return (
    <main className="container flex-1">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <article className="prose flex flex-col space-y-2 pt-16 dark:prose-invert">
        <div className="flex flex-col gap-4 mt-2">
          <h1 className="title m-0 tracking-tighter">{post.metadata.title}</h1>
          <p className="text-sm m-0">{formatDate(post.metadata.publishedAt)}</p>
        </div>
        <article>
          <CustomMDX source={post.content} />
        </article>
      </article>
    </main>
  );
}
