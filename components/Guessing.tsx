import type { NextPage } from "next";
import { useSelector } from "@xstate/react";
import { Table, TableHeadings, TableBody } from "./helpers/Table";

const Guessing: NextPage<{ service: any; finalGuess: boolean }> = ({
  service,
  finalGuess,
}) => {
  const players = useSelector(service, (state: any) => state.context.players);
  const currentNoun = useSelector(
    service,
    (state: any) => state.context.nouns[state.context.currentNounIndex]
  );
  const guessedAnswers = useSelector(
    service,
    (state: any) => state.context.guessedAnswers
  );
  return (
    <div className="mx-auto pt-12 max-w-4xl">
      {finalGuess ? (
        <h1 className="text-center text-2xl text-green-400">
          Times up - Final Guess!
        </h1>
      ) : (
        <h1>&nbsp;</h1>
      )}
      <h1 className="text-9xl text-center">{currentNoun}</h1>
      <div className="text-center my-12">
        <button
          className="border-2 shadow hover:shadow-md transition-shadow duration-200 rounded py-2 px-6 text-lg inline-block mr-2"
          onClick={() => {
            service.send({ type: "CORRECT", noun: currentNoun });
          }}
        >
          Correct
        </button>
        <button
          className="border-2 shadow hover:shadow-md transition-shadow duration-200 rounded py-2 px-6 text-lg mr-2 inline-block"
          onClick={() => {
            service.send({ type: "WRONG", noun: currentNoun });
          }}
        >
          Wrong
        </button>
        <button
          className="border-2 shadow hover:shadow-md transition-shadow duration-200 rounded py-2 px-6 text-lg mr-2 inline-block"
          onClick={() => {
            service.send({ type: "PASS", noun: currentNoun });
          }}
        >
          Pass
        </button>
      </div>
      <div className="flex">
        <div className="flex-1 text-center">
          {players.map((player) => (
            <div key={player.id} className="pb-1">
              <button
                className="border rounded-full py-2 px-5 text-2xl"
                onClick={() => {
                  service.send({
                    type: "PENALTY",
                    noun: currentNoun,
                    id: player.id,
                    name: player.name,
                  });
                }}
              >
                {player.name}
              </button>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <Table>
            <TableHeadings headings={["Words", "Status", "Player"]} />
            <TableBody
              rows={guessedAnswers.map((guess) => [
                guess.noun,
                guess.status,
                guess.name,
              ])}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Guessing;
