import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const players = await prisma.player.findMany({
      select: { name: true, id: true },
      orderBy: {
        id: "asc",
      },
    });
    res.json({ players });
  } catch (error) {
    return res.status(500).end();
  }
}
