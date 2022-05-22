import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

var passwordHash = require("password-hash");

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const userData = await prisma.account.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        username: true,
        password: true,
        token: true,
      },
    });
    if (userData === null) {
      res.json({ error: true, errorCode: 3 }); // ! = wrongMail
    } else if (passwordHash.verify(password, userData.password) === true) {
      res.json({
        error: false,
        data: {
          email: userData.email,
          username: userData.username,
          token: userData.token,
        },
      });
    } else {
      res.json({ erro: true, errorCode: 4 }); // ! = wrongPassword
    }
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
