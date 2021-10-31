import type { NextPage } from "next";
import { useInterpret, useSelector } from "@xstate/react";
import gameMachine from "../lib/gameMachine";
import Setup from "../components/Setup";
import SelectDreamer from "../components/SelectDreamer";
import WaitingRoom from "../components/WaitingRoom";
import Guessing from "../components/Guessing";
import RecountTheDream from "../components/RecountTheDream";
import ShowScores from "../components/ShowScores";

const get = (state: any) => ({ matches: state.matches, value: state.value });
const compare = (prev: any, next: any) => prev.value === next.value;

const Game: NextPage = () => {
  const service = useInterpret(gameMachine);
  const { matches, value } = useSelector(service, get, compare);
  return (
    <div className="max-w-4xl mx-auto">
      {matches("setup") && <Setup service={service} />}
      {matches("night.selectDreamer") && <SelectDreamer service={service} />}
      {matches("night.saveCharacters") && <h1>Saving</h1>}
      {matches("night.waitingRoom") && <WaitingRoom service={service} />}
      {(matches("night.guessing") || matches("night.finalGuess")) && (
        <Guessing service={service} finalGuess={matches("night.finalGuess")} />
      )}
      {matches("day.recountTheDream") && <RecountTheDream service={service} />}
      {matches("day.showScores") && <ShowScores service={service} />}
    </div>
  );
};

export default Game;
