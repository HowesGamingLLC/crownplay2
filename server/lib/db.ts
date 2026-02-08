import pkg from "@prisma/client";

const { PrismaClient } = pkg;

type PrismaClient = typeof pkg.PrismaClient;

let prisma: InstanceType<PrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = new pkg.PrismaClient();
} else {
  // Avoid instantiating multiple PrismaClient instances in development
  const globalForPrisma = global as unknown as { prisma: InstanceType<PrismaClient> };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new pkg.PrismaClient({
      log: ["warn", "error"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
