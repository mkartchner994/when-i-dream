import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import prisma from "../../lib/prisma";

interface CharactersProps {
  players: {
    id: number;
    name: string;
  }[];
}

const Characters: NextPage<CharactersProps> = (props) => {
  return (
    <div className="max-w-4xl mx-auto">
      {props.players.map((player) => {
        return (
          <div className="pt-4 pb-4" key={player.id}>
            <Link href={`/characters/${player.id}`}>
              <a className="border rounded-full py-2 px-6 text-2xl">{player.name}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CharactersProps> =
  async () => {
    let players = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc'
      }
    });
    return {
      props: {
        players: players,
      },
    };
  };

export default Characters;
