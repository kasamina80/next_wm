import { PrismaClient } from '@prisma/client'
import historiesSeed from './histories.mjs';
import accessCountersSeed from './access_counters.mjs';

const prisma = new PrismaClient();

[historiesSeed, accessCountersSeed].forEach((callback) => {
  callback()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
});
