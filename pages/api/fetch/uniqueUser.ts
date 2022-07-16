import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    var { id } = req.query;
    if (typeof id === "string") {
      const result = await prisma.account.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          username: true,
          Post: {
            where: {
              visibility: "Public",
            },
          },
          bio: true,
          pictureUrl: true,
        },
      });
      res.json({ error: false, data: result });
    } else {
      res.json({ error: true, errorCode: 2 }); // ! = wrongParameter
    }
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
