import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Hack for Dev: Force Direct Connection (port 5432) to avoid PgBouncer errors
// The 6543 port is for Transaction pooling which dislikes Prisma's prepared statements in dev.
const databaseUrl = (process.env.DATABASE_URL || "").replace(":6543", ":5432");

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
