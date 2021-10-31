import type { NextPage } from "next";
import { useSelector } from "@xstate/react";
import FormButton from "./helpers/FormButton";
import { Table, TableHeadings, TableBody } from "./helpers/Table";

const ShowScores: NextPage<{ service: any }> = ({ service }) => {
  const players = useSelector(service, (state: any) => state.context.players);
  return (
    <div className="pt-4 text-2xl">
      <Table>
        <TableHeadings
          headings={["Player", "Character", "Score Change", "Total Score"]}
        />
        <TableBody
          rows={players.map((player) => [
            player.name,
            player.character,
            player.scoreChange,
            player.score,
          ])}
        />
      </Table>
      <div className="pt-4 pb-8">
        <FormButton
          onClick={() => {
            service.send({ type: "NEXT" });
          }}
        >
          Next
        </FormButton>
      </div>
    </div>
  );
};

export default ShowScores;
