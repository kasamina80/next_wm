import { publicProcedure, router } from './trpc';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import http from 'http';
import { PrismaClient } from '@prisma/client';

const appRouter = router({
  postList: publicProcedure
    .query(async () => {
        const prisma = new PrismaClient();
        return await prisma.post.findMany();
    }),
  // ...
});

export type AppRouter = typeof appRouter;

const handler = createHTTPHandler({
  router: appRouter,
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
