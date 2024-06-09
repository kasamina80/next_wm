import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const testPasswordHash = await bcrypt.hash("admin", 12);

const posts /* : Post[] */ = [
  { id: 1, username: "管理人", content: "こんにちは", password: testPasswordHash, created_at: new Date("2024-08-15T12:30+09:00") },
  ];


async function main() {
  const newPosts = await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });
  console.log(newPosts);
}

export default main;
