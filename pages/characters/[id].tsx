import { Player } from ".prisma/client";
import type { NextPage, GetServerSideProps } from "next";
import React from "react";
import prisma from "../../lib/prisma";

interface CharactersIdProps {
  player: Player | null;
}

const Characters: NextPage<CharactersIdProps> = (props) => {
  return (
    <div className="max-w-4xl mx-auto text-center pt-4">
      <div className="pb-8 text-3xl">{props.player?.name}</div>
      <div className="text-6xl font-bold">{props.player?.character}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CharactersIdProps> =
  async ({ params }) => {
    let player = await prisma.player.findUnique({
      where: {
        id: Number(params?.id),
      },
    });
    return {
      props: {
        player,
      },
    };
  };

export default Characters;
