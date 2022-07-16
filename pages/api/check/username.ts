import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username } = req.body;
    const userData = await prisma.account.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });
    if (userData === null) {
      res.json({ error: false });
    } else {
      res.json({
        error: true,
        errorCode: "Ce nom de compte est déja actif",
      });
    }
  } else {
    res.json({ error: true, errorCode: 1 });
  }
}
