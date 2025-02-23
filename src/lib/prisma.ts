import { PrismaClient } from "@prisma/client";

const prisma =
  (globalThis as typeof globalThis & { prisma?: PrismaClient }).prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production")
  (globalThis as typeof globalThis & { prisma?: PrismaClient }).prisma = prisma;

export { prisma };
