import { BlogPosts } from "@/components/posts";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container flex flex-col space-y-2 py-16">
        <article className="text-sm prose space-y-16 dark:prose-invert">
          <div className="space-y-1">
            <h3 className="font-mono mt-0">Profile</h3>
            <dl>
              <dt>Name</dt>
              <dd>Kenny Elshoff</dd>
              <dt>Hometown</dt>
              <dd>Rochester Hills, Michigan ✋</dd>
              <dt>Work</dt>
              <dd>
                Senior Web Engineer at Graham Media Group, previously WDIV Local
                4
              </dd>
              <dt>Interests</dt>
              <dd>I just wanna build cool shit</dd>
              <dt>Resume</dt>
              <dd>
                <Link href="https://kennyelshoff.com/resume">
                  <code>kennyelshoff.com/resume</code>
                </Link>
              </dd>
              <dt>Colophon</dt>
              <dd>Next.js, TailwindCSS, Geist Sans/Mono</dd>
              <dt>Source</dt>
              <dd>
                <Link href="https://github.com/reallybadnews">
                  <code>reallybadnews/kennyelshoff.com</code>
                </Link>
              </dd>
              <dt>Latest Commit</dt>
              <dd>
                <Link href="https://github.com/reallybadnews/kennyelshoff.com/commits">
                  <code className="bg-muted py-1 px-2 rounded-md">
                    77bce9ae
                  </code>
                </Link>
              </dd>
            </dl>
          </div>
          <div className="space-y-1">
            <Link href="/work">
              <h3 className="font-mono">Projects</h3>
            </Link>
            <BlogPosts />
          </div>
          <div className="space-y-1">
            <Link href="/writing">
              <h3 className="font-mono">Writing</h3>
            </Link>
            <p className="">The Kitchen Sink</p>
          </div>
        </article>
      </div>
    </main>
  );
}
