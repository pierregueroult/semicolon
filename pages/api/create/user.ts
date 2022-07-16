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
    if (username !== "" && email !== "" && password !== "") {
      const testIfMail = await prisma.account.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
      });
      if (testIfMail === null) {
        const testIfUsername = await prisma.account.findUnique({
          where: {
            username: username,
          },
          select: {
            id: true,
          },
        });
        if (testIfUsername === null) {
          const result = await prisma.account.create({
            data: {
              username: username,
              email: email,
              password: passwordHash.generate(password),
              token: uuid(),
            },
          });
          res.json({
            error: false,
            username: result.username,
            email: result.email,
          });
        } else {
          res.json({ error: true, errorCode: 6 }); // ! = usernameAlreadyUsed
        }
      } else {
        res.json({ error: true, errorCode: 5 }); // ! = emailAlreadyUsed
      }
    } else {
      res.json({ error: true, errorCode: 7 }); // ! = emptyChain
    }
  } else {
    res.json({ error: true, errorCode: 1 }); // ! = wrongMethod
  }
}
// the body required username and email and password
