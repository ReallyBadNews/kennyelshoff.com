import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";
import { getPlaiceholder } from "plaiceholder";
import { CreateOrUpdateStashInput } from "./types";
import { getHostname, slugify } from "./utils";
import { generateMDX } from "./mdx";

// TODO: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-getting-access-to-the-return-type-of-a-function
export type Stashes = Prisma.PromiseReturnType<
  typeof getStashesByTag
>["stashes"];
export type Stash = Stashes[number];

export type AllStashes = Prisma.PromiseReturnType<typeof getAllStashes>;
export type NewStash = Prisma.PromiseReturnType<typeof createStash>;

/**
 * TODO:
[ ] - Add pagination - https://www.prisma.io/docs/concepts/components/prisma-client/pagination
      https://stackoverflow.com/questions/73044452/how-to-create-a-paginated-table-using-nextjs-prisma-and-swr
*/
// export const getAllStashes = async ({ take = 5, skip = 0 } = {}) => {
export const getAllStashes = async ({ page = 1, limit = 5 } = {}) => {
  const stashes = await prisma.stash.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      author: true,
    },
  });

  const totalStashes = await prisma.stash.count();

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
    total: totalStashes,
    page,
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
      image: true,
    },
  });

  if (!stash) return null;

  return {
    ...stash,
    date: stash.createdAt.toISOString(),
    createdAt: stash.createdAt.toISOString(),
    updatedAt: stash.updatedAt.toISOString(),
    ...(stash.image
      ? {
          image: {
            ...stash.image,
            createdAt: stash.image.createdAt.toISOString(),
            updatedAt: stash.image.updatedAt.toISOString(),
          },
        }
      : {}),
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
};

export const getStashBySlug = async (slug: string) => {
  const stash = await prisma.stash.findUnique({
    where: { slug },
    include: {
      tags: true,
      author: true,
      image: true,
    },
  });

  if (!stash) return null;

  return {
    ...stash,
    ...(stash.image
      ? {
          image: {
            ...stash.image,
            createdAt: stash.image.createdAt.toISOString(),
            updatedAt: stash.image.updatedAt.toISOString(),
          },
        }
      : {}),
    ...(stash?.author
      ? {
          author: {
            ...stash.author,
            createdAt: stash.author.createdAt.toISOString(),
            updatedAt: stash.author.updatedAt.toISOString(),
          },
        }
      : undefined),
    date: stash?.createdAt.toISOString(),
    createdAt: stash?.createdAt.toISOString(),
    updatedAt: stash?.updatedAt.toISOString(),
  };
};

export const createStash = async (payload: CreateOrUpdateStashInput) => {
  const { imageAlt, ...updatePayload } = payload;

  const requestBody: Prisma.StashCreateInput = {
    ...updatePayload,
    author: undefined,
    tags: undefined,
    image: undefined,
  };

  if (updatePayload.tags) {
    // convert tags from string to array
    const tagArray = Array.isArray(updatePayload.tags)
      ? updatePayload.tags
      : updatePayload.tags.split(",").map((tag) => {
          return tag.trim();
        });

    requestBody.tags = {
      connectOrCreate: tagArray.map((tag) => {
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

  // Get plaiceholder data for the image
  if (updatePayload.image) {
    const { base64, img } = await getPlaiceholder(updatePayload.image);

    requestBody.image = {
      connectOrCreate: {
        where: {
          src: img.src,
        },
        create: {
          src: img.src,
          height: img.height,
          width: img.width,
          blurDataURL: base64,
          alt: imageAlt || "Header image",
        },
      },
    };
  }

  const mdxBody = updatePayload.body
    ? await generateMDX({ source: updatePayload.body })
    : null;

  requestBody.mdxBody = mdxBody?.code ?? null;
  requestBody.host = getHostname(updatePayload.url);
  requestBody.slug = slugify(updatePayload.title);
  requestBody.author = updatePayload.author?.email
    ? { connect: { email: updatePayload.author.email } }
    : undefined;

  console.log("[lib/createStash] requestBody", requestBody);

  const newStash = await prisma.stash.create({
    data: {
      ...requestBody,
    },
    include: {
      tags: true,
      author: true,
      image: true,
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

  const { imageAlt, ...updatePayload } = payload;

  const requestBody: Prisma.StashUpdateInput = {
    ...updatePayload,
    author: undefined,
    tags: undefined,
    image: undefined,
  };

  if (updatePayload.tags) {
    // convert tags from string to array
    const tagArray = Array.isArray(updatePayload.tags)
      ? updatePayload.tags
      : updatePayload.tags.split(",").map((tag) => {
          return tag.trim();
        });

    requestBody.tags = {
      connectOrCreate: tagArray.map((tag) => {
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
      set: tagArray.map((tag) => {
        return {
          name: tag,
        };
      }),
    };
  }

  // Get plaiceholder data for the image
  if (updatePayload.image) {
    const { base64, img } = await getPlaiceholder(updatePayload.image);
    requestBody.image = {
      connectOrCreate: {
        where: {
          src: img.src,
        },
        create: {
          src: img.src,
          height: img.height,
          width: img.width,
          blurDataURL: base64,
          alt: imageAlt || "Header image",
        },
      },
    };
  }

  const mdxBody = updatePayload.body
    ? await generateMDX({ source: updatePayload.body })
    : null;
  requestBody.mdxBody = mdxBody?.code || null;

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
      image: true,
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
      image: true,
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
      image: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const serializedStashes = stashes.map((stash) => {
    return {
      ...stash,
      date: stash.createdAt.toISOString(),
      createdAt: stash.createdAt.toISOString(),
      updatedAt: stash.updatedAt.toISOString(),
      ...(stash.image
        ? {
            image: {
              ...stash.image,
              createdAt: stash.image.createdAt.toISOString(),
              updatedAt: stash.image.updatedAt.toISOString(),
            },
          }
        : {}),
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
