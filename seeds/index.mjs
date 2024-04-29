import { PrismaClient } from '@prisma/client'
import historiesSeed from './histories.mjs';

const prisma = new PrismaClient();


historiesSeed()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

