import { prisma } from "@lib/prisma";
import { bundleMDX } from "mdx-bundler";

/**
 * TODO:
[ ] - Add pagination - https://www.prisma.io/docs/concepts/components/prisma-client/pagination
[ ] - Abstract fetch and tranform into function
[ ] - Convert `createdAt` and `updatedAt` with `.toISOString()`
[ ] - Transform `body` to mdxBody
*/
export const getAllStashes = async () => {
  const stashes = await prisma.stash.findMany({
    include: {
      tags: true,
    },
  });

  const stashMdxBodys = await Promise.all(
    stashes.map(async (stash) => {
      if (!stash.body) return null;
      const mdxBody = await bundleMDX({ source: stash.body });
      return mdxBody;
    })
  );

  const serializedStashes = stashes.map((stash, index) => {
    return {
      ...stash,
      date: stash.createdAt.toISOString(),
      createdAt: stash.createdAt.toISOString(),
      updatedAt: stash.updatedAt.toISOString(),
      ...(stash.body ? { mdxBody: stashMdxBodys[index]?.code } : undefined),
    };
  });

  return serializedStashes;
};
