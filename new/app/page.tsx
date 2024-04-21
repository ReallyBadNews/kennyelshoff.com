import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container flex flex-col space-y-2 py-16">
        <article className="text-sm prose space-y-16 dark:prose-invert">
          <dl>
            <dt>Name</dt>
            <dd>Kenny Elshoff</dd>
            <dt>Hometown</dt>
            <dd>Rochester Hills, Michigan ✋</dd>
            <dt>Work</dt>
            <dd>
              Senior Web Engineer at Graham Media Group, previously WDIV Local 4
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
                <code>77bce9ae</code>
              </Link>
            </dd>
          </dl>
          <div className="space-y-1">
            <h3 className="font-mono">Projects</h3>
            <p className="">Lots of cool things...</p>
          </div>
        </article>
      </div>
    </main>
  );
}
