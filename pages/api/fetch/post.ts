import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    var { count, shares } = req.query;
    if (typeof count == "string" && typeof shares == "string") {
      // ! likés
      const result = await prisma.post.findMany({
        orderBy: {
          shares: "asc",
        },
        where: {
          createdAt: {
            lt: Date(),
          },
        },
        take: parseInt(count),
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          shares: true,
          likes: true,
          viewCount: true,
        },
      });
      res.json(result);
    } else if (typeof count == "string") {
      // ! récents
      const result = await prisma.post.findMany({
        orderBy: {
          createdAt: "asc",
        },
        take: parseInt(count),
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          shares: true,
          likes: true,
          viewCount: true,
        },
      });
      res.send(result);
    } else {
      res.json({ error: true, errorCode: 2 });
    }
  } else {
    res.json({ error: true, errorCode: 1 });
  }
}
