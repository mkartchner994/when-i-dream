import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.player.delete({
      where: {
        id: Number(req.body.id),
      },
    });
  } catch (error) {
    res.status(500);
  }

  res.end();
}
