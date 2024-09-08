import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from "cookie";
import { PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  let count = req.cookies.count;

  if (count === undefined || isNaN(parseInt(count))) {
    try {
      const prisma = new PrismaClient();
      const fetchedAccessCounter = await prisma.accessCounter.findUnique({ where: { id: 1 } });
      // アクセス数がCookieに保存されていなかったらUUなので+1する
      const accessCount: number = fetchedAccessCounter!.count + 1;
      count = accessCount.toString();

      // 更新後の値をDBに保存する
      const result = await prisma.accessCounter.update({ where: { id: 1 }, data: { count: accessCount } });
    } catch (error) {
      console.error(error);
    }
    res.setHeader('Set-Cookie', cookie.serialize('count', count!));
  }

  return res.status(200).json({message: count || ""});
}
