import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const player = await prisma.player.create({
      data: {
        name: req.body.name,
        character: "",
      },
      select: {
        id: true,
        name: true
      }
    });
    res.json({ player });
  } catch (error) {
    res.status(500).end();
  }
}
