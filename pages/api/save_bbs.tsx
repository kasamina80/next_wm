import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  console.log("in bbs save api");

  try {
    const prisma = new PrismaClient();

    // INSERT to DB
    console.log("db write");
    const rawHash = JSON.parse(req.body);
    console.log(rawHash);
    // backend validation
    if (rawHash.username === "" || rawHash.content === "") {
      throw new Error("Post validation error");
    }
    const dataToSave = { ...rawHash, created_at: new Date() }
    const result = await prisma.post.create({ data: dataToSave });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "" });
  }

  return res.status(200).json({ message: "" });
}
