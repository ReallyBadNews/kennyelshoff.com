import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient is attached to the `global` object in development to prevent
 * exhausting the database connection limit.
 * Documentation:
 * https://pris.ly/d/help/next-js-best-practices
 * https://github.com/planetscale/nextjs-planetscale-starter/blob/main/db/index.ts
 */

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined;
}

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    errorFormat: "minimal",
  });
} else {
  globalThis.prisma =
    globalThis.prisma ||
    new PrismaClient({
      errorFormat: "pretty",
    });
  prisma = globalThis.prisma;
}

export { prisma };
