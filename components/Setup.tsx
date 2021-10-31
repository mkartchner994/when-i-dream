import type { NextPage } from "next";
import { useSelector } from "@xstate/react";
import { useEffect, useRef } from "react";
import Title from "./helpers/Title";
import FormButton from "./helpers/FormButton";
import FormInput from "./helpers/FormInput";

const Setup: NextPage<{ service: any }> = ({ service }) => {
  const addForm = useRef();
  const players = useSelector(service, (state: any) => state.context.players);
  useEffect(() => {
    addForm.current.reset();
  }, [players]);
  return (
    <div>
      <div className="pt-4">
        <Title>Add a Player</Title>
      </div>
      <form
        ref={addForm}
        className="pl-2 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-ignore
          const name = e.target.name.value;
          service.send({ type: "ADD_PLAYER", name });
        }}
      >
        <div className="inline-block mr-2">
          <FormInput type="text" name="name" />
        </div>
        <FormButton type="submit">Submit</FormButton>
      </form>
      <div className="pt-6">
        <Title>Current Players</Title>
      </div>
      {players.map((player: any) => (
        <form
          key={player.id}
          className="pl-2 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            // @ts-ignore
            const id = e.target.id.value;
            // @ts-ignore
            const name = e.target.name.value;
            service.send({ type: "UPDATE_PLAYER", name, id });
          }}
        >
          <input type="hidden" name="id" value={player.id} />
          <div className="inline-block mr-2">
            <FormInput type="text" name="name" defaultValue={player.name} />
          </div>
          <div className="inline-block mr-2">
            <FormButton type="submit">Update</FormButton>
          </div>
          <FormButton
            type="button"
            onClick={() => {
              service.send({ type: "DELETE_PLAYER", id: player.id });
            }}
          >
            Delete
          </FormButton>
        </form>
      ))}

      <div className="pt-4 pb-8">
        {players.length >= 4 && players.length <= 10 ? (
          <FormButton
            onClick={() => {
              service.send({ type: "NEXT" });
            }}
          >
            Next
          </FormButton>
        ) : (
          "Must have between 4 and 10 players"
        )}
      </div>
    </div>
  );
};

export default Setup;
