import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    const userData = await prisma.account.findUnique({
      where: {
        token: token,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    if (userData === null) {
      res.json({ error: true, errorCode: 3 }); // ! = wrongMail
    } else {
      res.json({ error: false, data: userData });
    }
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
