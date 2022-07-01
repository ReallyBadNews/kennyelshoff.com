import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";
import { CreateOrUpdateStashInput } from "./types";
import { getHostname, slugify } from "./utils";
import { generateMDX } from "./mdx";

// TODO: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-getting-access-to-the-return-type-of-a-function
// export type Stashes = Awaited<ReturnType<typeof getAllStashes>>["stashes"];
// export type Stash = Stashes[number];
// type ThenArg<T> = T extends Promise<infer U> ? U : T;
// export type TagsWithPosts = ThenArg<ReturnType<typeof getStashesByTag>>;
export type Stashes = Prisma.PromiseReturnType<
  typeof getStashesByTag
>["stashes"];
export type Stash = Stashes[number];

/**
 * TODO:
[ ] - Add pagination - https://www.prisma.io/docs/concepts/components/prisma-client/pagination
[x] - Abstract fetch and tranform into function
[x] - Convert `createdAt` and `updatedAt` with `.toISOString()`
[x] - Transform `body` to mdxBody
*/
export const getAllStashes = async () => {
  const stashes = await prisma.stash.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      author: true,
    },
  });

  const serializedStashes = stashes.map((stash) => {
    return {
      ...stash,
      date: stash.createdAt.toISOString(),
      createdAt: stash.createdAt.toISOString(),
      updatedAt: stash.updatedAt.toISOString(),
      ...(stash.author
        ? {
            author: {
              ...stash.author,
              createdAt: stash.author.createdAt.toISOString(),
              updatedAt: stash.author.updatedAt.toISOString(),
            },
          }
        : {}),
    };
  });

  return {
    stashes: serializedStashes,
    total: serializedStashes.length,
  };
};

export const getStashById = async (id: string | number) => {
  let queryId: string;
  if (typeof id === "number") {
    queryId = id.toString();
  } else {
    queryId = id;
  }

  const stash = await prisma.stash.findUnique({
    where: { id: queryId },
    include: {
      tags: true,
      author: true,
    },
  });

  if (!stash) return null;

  return {
    ...stash,
    date: stash.createdAt.toISOString(),
    createdAt: stash.createdAt.toISOString(),
    updatedAt: stash.updatedAt.toISOString(),
  };
};

export const getStashBySlug = async (slug: string) => {
  const stash = await prisma.stash.findUnique({
    where: { slug },
    include: {
      tags: true,
      author: true,
    },
  });

  if (!stash) return null;

  return {
    ...stash,
    date: stash.createdAt.toISOString(),
    createdAt: stash.createdAt.toISOString(),
    updatedAt: stash.updatedAt.toISOString(),
  };
};

export const createStash = async (payload: CreateOrUpdateStashInput) => {
  const requestBody: Prisma.StashCreateInput = {
    ...payload,
    author: undefined,
    tags: undefined,
  };

  if (payload.tags) {
    requestBody.tags = {
      connectOrCreate: payload.tags.map((tag) => {
        return {
          where: {
            name: tag,
          },
          create: {
            name: tag,
            slug: slugify(tag),
          },
        };
      }),
    };
  }

  const mdxBody = payload.body
    ? await generateMDX({ source: payload.body })
    : null;

  requestBody.mdxBody = mdxBody?.code ?? null;
  requestBody.host = getHostname(payload.url);
  requestBody.slug = slugify(payload.title);
  requestBody.author = payload.author?.email
    ? { connect: { email: payload.author.email } }
    : undefined;

  console.log("[lib/createStash] requestBody", requestBody);

  const newStash = await prisma.stash.create({
    data: {
      ...requestBody,
    },
    include: {
      tags: true,
      author: true,
    },
  });

  return {
    ...newStash,
    date: newStash.createdAt.toISOString(),
    createdAt: newStash.createdAt.toISOString(),
    updatedAt: newStash.updatedAt.toISOString(),
  };
};

export const updateStashById = async (
  id: string | number,
  payload: CreateOrUpdateStashInput
) => {
  let queryId: string;
  if (typeof id === "number") {
    queryId = id.toString();
  } else {
    queryId = id;
  }

  const requestBody: Prisma.StashUpdateInput = {
    ...payload,
    author: undefined,
    tags: undefined,
  };

  if (payload.tags) {
    requestBody.tags = {
      connectOrCreate: payload.tags.map((tag) => {
        return {
          where: {
            name: tag,
          },
          create: {
            name: tag,
            slug: slugify(tag),
          },
        };
      }),
      set: payload.tags.map((tag) => {
        return {
          name: tag,
        };
      }),
    };
  }

  const mdxBody = payload.body
    ? await generateMDX({ source: payload.body })
    : null;
  requestBody.mdxBody = mdxBody?.code || undefined;

  console.log(
    "[lib/updateStashById] requestBody",
    JSON.stringify(requestBody, null, 2)
  );

  const stash = await prisma.stash.update({
    where: {
      id: queryId,
    },
    data: requestBody,
    include: {
      tags: true,
    },
  });

  const { body, ...rest } = stash;

  return {
    ...rest,
    date: stash.createdAt.toISOString(),
    createdAt: stash.createdAt.toISOString(),
    updatedAt: stash.updatedAt.toISOString(),
  };
};

export const deleteStashById = async (id: string | number) => {
  let queryId: string;
  if (typeof id === "number") {
    queryId = id.toString();
  } else {
    queryId = id;
  }

  const stash = await prisma.stash.delete({
    where: {
      id: queryId,
    },
    include: {
      tags: true,
    },
  });

  return stash;
};

export const getStashesByTag = async (tag: string) => {
  const stashes = await prisma.stash.findMany({
    where: {
      tags: {
        some: {
          slug: tag,
        },
      },
    },
    include: {
      tags: true,
      author: true,
    },
  });

  const serializedStashes = stashes.map((stash) => {
    return {
      ...stash,
      date: stash.createdAt.toISOString(),
      createdAt: stash.createdAt.toISOString(),
      updatedAt: stash.updatedAt.toISOString(),
      ...(stash.author
        ? {
            author: {
              ...stash.author,
              createdAt: stash.author.createdAt.toISOString(),
              updatedAt: stash.author.updatedAt.toISOString(),
            },
          }
        : {}),
    };
  });

  return {
    stashes: serializedStashes,
    total: serializedStashes.length,
  };
};
