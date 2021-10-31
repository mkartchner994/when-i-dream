import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    for (const player of req.body.players) {
      await prisma.player.update({
        where: {
          id: Number(player.id),
        },
        data: {
          character: player.character,
        },
      });
    }
  } catch (error) {
    res.status(500);
  }

  res.end();
}
