import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    var { token } = req.body;
    const userData = await prisma.account.findUnique({
      where: {
        token: token,
      },
      select: {
        id: true,
        username: true,
        email: true,
        token: true,
        bio: true,
        Post: true,
        pictureUrl: true,
      },
    });
    if (userData === null) {
      res.json({ error: true, errorCode: 3 }); // ! = wrongMail
    } else {
      res.json({ error: false, data: userData });
    }
  } else {
    res.json({ error: true, errorCode: 1 });
  }
}
