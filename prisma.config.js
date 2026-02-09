/** @type {import('@prisma/client').Config} */
module.exports = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};
