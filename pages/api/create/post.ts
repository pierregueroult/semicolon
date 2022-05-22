import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.title || !req.body.content || !req.body.authorEmail) {
    res.json({ error: true, errorCode: 2 }); // ! = wrongParameter
  }
  const { title, content, authorEmail } = req.body;

  if (req.method === "GET") {
    const result = prisma.post.create({
      data: {
        title: title,
        content: content,
        Account: { connect: { email: authorEmail } },
      },
    });
    res.json(result);
  } else {
    res.json({ error: true, errorCode: 1 }); // ! wrongMethod
  }
}

// the body require title and author email
