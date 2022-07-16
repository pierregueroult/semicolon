import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, token } = req.body;
    const updateUser = await prisma.account.update({
      where: {
        token: token,
      },
      data: {
        username: username,
      },
    });
    return updateUser;
  } else {
    res.json({ error: true, errorCode: 1 });
  }
}
