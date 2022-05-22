import { randomInt } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    var { count } = req.query;
    if (typeof count == "string") {
      let counts = await prisma.videos.count();
      let ids = randomInt(counts - parseInt(count) + 1);
      const result = await prisma.videos.findMany({
        where: {
          id: {
            gt: ids,
          },
        },
        select: {
          id: true,
          link: true,
        },
        take: 5,
      });
      res.json(result);
    } else {
      res.json({ error: true, errorCode: 2 }); // ! = wrongParameter
    }
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
