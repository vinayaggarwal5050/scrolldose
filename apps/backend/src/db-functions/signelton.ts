import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
  if(!prisma) {
    return new PrismaClient();
  } else {
    return prisma;
  }
}
