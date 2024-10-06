import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie";
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include'
        });
      },
    }),
  ],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  console.log("in api");

  // Cookieから取得を試みる
  let count = req.cookies.count;
  console.log(count);

  // 取得に失敗したとき
  if (count === undefined || isNaN(parseInt(count))) {
    try {
      console.log("db fetch");
      // 現在のアクセスカウンターの値をDBから取得
      // 新規ユーザーなのでDBの値に+1して表示
      const accessCount: number = await trpc.getCurrentAccessCount.query() + 1;
      count = accessCount.toString();
      console.log(count);

      // 新しい値をDBに保存
      console.log("db write");
      const data = { count: accessCount };
      await trpc.setAccessCount.mutate(data);
    } catch (error) {
      console.error(error);
    }
    console.log(count);
    console.log("setting cookie");
    // Cookieに値を設定
    res.setHeader('Set-Cookie', cookie.serialize('count', count!));
  }

  return res.status(200).json({message: count || ""});
}
