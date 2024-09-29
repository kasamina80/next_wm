import { publicProcedure, router } from './trpc';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import http from 'http';
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const appRouter = router({
  // 経歴一覧
  workHistoryList: publicProcedure
    .query(async () => {
      return await prisma.workHistory.findMany();
    }),

  // 簡易BBS 投稿一覧
  postList: publicProcedure
    .query(async () => {
      return await prisma.post.findMany();
    }),

  // 簡易BBS 投稿登録
  postCreate: publicProcedure
    .input(z.object({ 
      username: z.string().trim().min(1),
      content: z.string().trim().min(1),
      password: z.string().nullable()
    }))
    .mutation(async (opts) => {
      const input = opts.input;
      const dataToSave = { ...input, created_at: new Date() }
      await prisma.post.create({ data: dataToSave });
    }),

  // 簡易BBS 投稿削除
  postDelete: publicProcedure
    .input(z.object({
      postId: z.number(),
      password: z.string().nullable()
    })).mutation(async (opts) => {
      const input = opts.input;
      const postId = input.postId;

      try {
        if (!input.password) {
          return undefined;
        }

        const prisma = new PrismaClient();

        // find from DB
        const record = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
    
        if (!record.password) {
          return undefined;
        }
    
        const passwordMatch = await bcrypt.compare(input.password, record.password);
    
        if(!passwordMatch) {
          return undefined;
        }
    
        console.log("db delete");
        return await prisma.post.delete({ where: { id: postId } });
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }),
});

export type AppRouter = typeof appRouter;

const handler = createHTTPHandler({
  router: appRouter
});

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
};

const server = http.createServer((req, res) => {
  // CORSヘッダーを設定
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // プリフライトリクエスト（OPTIONS）の処理
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // tRPCハンドラーを呼び出す
  handler(req, res);
});

server.listen(4000);
console.log('tRPC server listening on port 4000');
