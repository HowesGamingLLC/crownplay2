import pkg from "@prisma/client";

const { PrismaClient } = pkg;

let prisma: any;

if (process.env.NODE_ENV === "production") {
  prisma = new pkg.PrismaClient();
} else {
  // Avoid instantiating multiple PrismaClient instances in development
  const globalForPrisma = global as unknown as { prisma: any };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new pkg.PrismaClient({
      log: ["warn", "error"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
