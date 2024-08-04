import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from "cookie";
import { PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  console.log("in api");

  console.log(req);
  let count = req.cookies.count;
  console.log(count);

  if (count === undefined || isNaN(parseInt(count))) {
    try {
      console.log("db fetch");
      const prisma = new PrismaClient();
      const fetchedAccessCounter = await prisma.accessCounter.findUnique({ where: { id: 1 } });
      console.log(fetchedAccessCounter);
      // Pass data to the page via props
      // +1 because it's a UU
      const accessCount: number = fetchedAccessCounter!.count + 1;
      count = accessCount.toString();

      // put it in DB
      console.log("db write");
      const result = await prisma.accessCounter.update({ where: { id: 1 }, data: { count: accessCount } });
    } catch (error) {
      console.error(error);
    }
    console.log(count);
    console.log("setting cookie");
    res.setHeader('Set-Cookie', cookie.serialize('count', count!));
  }

  return res.status(200).json({message: count || ""});
}
