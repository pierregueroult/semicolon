import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      include: { Account: true },
    });
    res.json(posts);
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
