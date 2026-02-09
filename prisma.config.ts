import type { Config } from "@prisma/internals";

export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
} satisfies Config;
