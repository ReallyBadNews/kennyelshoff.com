import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";
import { CreateOrUpdateStashInput } from "./types";
import { getHostname } from "./utils";
import { generateMDX } from "./mdx";

export type Stashes = Awaited<ReturnType<typeof getAllStashes>>["stashes"];
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
    },
  });

  const serializedStashes = stashes.map((stash) => {
    return {
      ...stash,
      date: stash.createdAt.toISOString(),
      createdAt: stash.createdAt.toISOString(),
      updatedAt: stash.updatedAt.toISOString(),
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
    tags: undefined,
  };

  if (payload.tags) {
    requestBody.tags = {
      connectOrCreate: payload.tags.map((tag) => {
        return {
          where: {
            tag,
          },
          create: {
            tag,
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

  const newStash = await prisma.stash.create({
    data: requestBody,
    include: {
      tags: true,
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
    tags: undefined,
  };

  if (payload.tags) {
    requestBody.tags = {
      set: payload.tags.map((tag) => {
        return {
          tag,
        };
      }),
    };
  }

  const mdxBody = payload.body
    ? await generateMDX({ source: payload.body })
    : null;
  requestBody.mdxBody = mdxBody?.code || undefined;

  const stash = await prisma.stash.update({
    where: {
      id: queryId,
    },
    data: {
      ...requestBody,
    },
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
