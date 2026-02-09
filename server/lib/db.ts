import pkg from "@prisma/client";
const { PrismaClient } = pkg;

let prisma: typeof pkg.PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Avoid instantiating multiple PrismaClient instances in development
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ["warn", "error"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
