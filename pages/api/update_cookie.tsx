import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from "cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ message: string }>
) {
    console.log(req);
    const count = req.cookies.count;
    console.log(count);

    res.setHeader('Set-Cookie', cookie.serialize('count', Math.random().toString()))
    return res.status(200).json({message: "Welcome!"});
}
