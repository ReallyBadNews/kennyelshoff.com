/* eslint-disable no-console */

import { Prisma, PrismaClient } from "@prisma/client";

const seedViews: Prisma.ViewsCreateInput[] = [
  { slug: "/posts/kitchen-sink", count: 10000 },
  { slug: "post-2", count: 2 },
  { slug: "post-3", count: 3 },
  { slug: "post-4", count: 4 },
  { slug: "post-5", count: 5 },
  { slug: "post-6", count: 6 },
  { slug: "post-7", count: 7 },
  { slug: "post-8", count: 8 },
  { slug: "post-9", count: 9 },
  { slug: "post-10", count: 10 },
];

const seedStashes: Prisma.StashCreateInput[] = [
  {
    createdAt: "2022-05-08T03:21:46.245Z",
    updatedAt: "2022-05-08T03:21:46.245Z",
    url: "https://www.prisma.io/docs/concepts/components/prisma-schema/data-model",
    host: "www.prisma.io",
    title: "Stash 1",
    description: "Stash 1 description",
    body: "Stash 1 body",
    tags: {
      connectOrCreate: [
        {
          where: {
            tag: "tag-1",
          },
          create: {
            tag: "tag-1",
          },
        },
      ],
    },
  },
  {
    createdAt: "2022-06-08T03:27:46.245Z",
    updatedAt: "2022-06-08T03:27:46.245Z",
    url: "https://www.clickondetroit.com/",
    host: "www.clickondetroit.com",
    title: "Stash 2",
    description: "Stash 2 description",
    body: "Stash 2 body",
    tags: {
      connectOrCreate: [
        {
          where: {
            tag: "tag-2",
          },
          create: {
            tag: "tag-2",
          },
        },
        {
          where: {
            tag: "tag-3",
          },
          create: {
            tag: "tag-3",
          },
        },
      ],
    },
  },
  {
    createdAt: "2022-06-11T03:27:46.245Z",
    url: "https://kennyelshoff.com/",
    host: "kennyelshoff.com",
    title: "Stash 3",
    description: "Stash 3 description",
    body: "Stash 3 body",
    tags: {
      connectOrCreate: [
        {
          where: {
            tag: "tag-1",
          },
          create: {
            tag: "tag-1",
          },
        },
        {
          where: {
            tag: "tag-4",
          },
          create: {
            tag: "tag-4",
          },
        },
      ],
    },
  },
];

const prisma = new PrismaClient();

async function main() {
  seedViews.forEach(async (view) => {
    await prisma.views.create({
      data: view,
    });
    console.log(`View ${view.slug} created`);
  });

  seedStashes.forEach(async (stash) => {
    await prisma.stash.create({
      data: stash,
    });
    console.log(`Stash ${stash.url} created`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
