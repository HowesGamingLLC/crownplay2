import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

let prisma: InstanceType<typeof PrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  // Avoid instantiating multiple PrismaClient instances in development
  const globalForPrisma = global as unknown as { prisma: InstanceType<typeof PrismaClient> };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: ["warn", "error"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
