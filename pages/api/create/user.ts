import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { v4 as uuid } from "uuid";
var passwordHash = require("password-hash");

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const result = await prisma.account.create({
      data: {
        username: username,
        email: email,
        password: passwordHash.generate(password),
        token: uuid(),
      },
    });
    res.json(result);
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
// the body required username and email and password
