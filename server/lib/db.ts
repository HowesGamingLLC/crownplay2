import pkg from "@prisma/client";
const { PrismaClient } = pkg;

let prisma: InstanceType<typeof PrismaClient>;

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return url;
};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasourceUrl: getDatabaseUrl(),
  });
} else {
  // Avoid instantiating multiple PrismaClient instances in development
  const globalForPrisma = global as unknown as { prisma: InstanceType<typeof PrismaClient> };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasourceUrl: getDatabaseUrl(),
      log: ["warn", "error"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
