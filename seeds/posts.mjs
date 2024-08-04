import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const testPasswordHash = bcrypt.hashSync("password", 12);

const posts /* : Post[] */ = [
  { id: 1, username: "管理人", content: "こんにちは", password: testPasswordHash, created_at: new Date("2024-08-15T12:30:00+09:00") },
  { id: 2, username: "132番目の素数さん", content: "2get", password: testPasswordHash, created_at: new Date("2024-08-15T12:30:39+09:00") },
];


async function main() {
  const newPosts = await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });
  console.log(newPosts);
}

export default main;
