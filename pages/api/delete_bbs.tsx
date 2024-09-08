import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  // early return
  const rawHash: { postId: string, password: string } = JSON.parse(req.body);
  if (rawHash.password === "") {
    return res.status(404).json({ message: "" });
  }

  try {
    const prisma = new PrismaClient();

    // INSERT to DB
    const id = parseInt(rawHash.postId);
    const record = await prisma.post.findUniqueOrThrow({ where: { id: id } });

    if (!record.password) {
      return res.status(404).json({ message: "" });
    }

    const passwordMatch = await bcrypt.compare(rawHash.password, record.password);

    if(!passwordMatch) {
      return res.status(404).json({ message: "" });
    }

    await prisma.post.delete({ where: { id: id } });
  } catch (error) {
    return res.status(500).json({ message: "" });
  }

  return res.status(200).json({ message: "" });
}
