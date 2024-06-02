import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

/*
type AccessCounter = {
  id: number,
  count: number
};

// JS does not have an integer type, but I want to declare it anyway, so I make it an alias
type integer = number;
*/

const accessCounters /* : AccessCounter[] */ = [
  { id: 1, count: 0 },
];

async function main() {
  const newAccessCounters = await prisma.accessCounter.createMany({
    data: accessCounters,
    skipDuplicates: true,
  });
  console.log(newAccessCounters);
}

export default main;
