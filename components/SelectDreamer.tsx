import type { NextPage } from "next";
import { useSelector } from "@xstate/react";
import Title from "./helpers/Title";
import SelectedOptionButton from "./helpers/SelectedOptionButton";
import FormButton from "./helpers/FormButton";

const SelectDreamer: NextPage<{ service: any }> = ({ service }) => {
  const players = useSelector(service, (state: any) => state.context.players);
  const currentDreamer = useSelector(service, (state: any) =>
    state.context.players.find((player) => player.character === "Dreamer")
  );
  return (
    <div>
      <div className="pt-4 pb-8">
        <Title>Select a Dreamer</Title>
      </div>
      {players.map((player) => (
        <div className="pb-2" key={player.id}>
          <SelectedOptionButton
            selected={player.character === "Dreamer"}
            onClick={() => {
              service.send({ type: "SELECT_DREAMER", id: player.id });
            }}
          >
            {player.name}
          </SelectedOptionButton>
        </div>
      ))}

      <div className="pt-4 pb-8">
        {currentDreamer ? (
          <FormButton
            onClick={() => {
              service.send({ type: "NEXT" });
            }}
          >
            Next
          </FormButton>
        ) : null}
      </div>
    </div>
  );
};

export default SelectDreamer;
