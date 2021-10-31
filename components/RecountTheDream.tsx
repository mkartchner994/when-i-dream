import type { NextPage } from "next";
import { useSelector } from "@xstate/react";
import Title from "./helpers/Title";
import FormButton from "./helpers/FormButton";
import { Table, TableHeadings, TableBody } from "./helpers/Table";

const RecountTheDream: NextPage<{ service: any }> = ({ service }) => {
  const guessedAnswers = useSelector(
    service,
    (state: any) => state.context.guessedAnswers
  );
  return (
    <div>
      <div className="pt-4 pb-8">
        <Title>Time to recount the dream!</Title>
      </div>
      <div className="pb-8">
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
      <div className="inline-block mr-2">
        <FormButton
          className="border-2 shadow hover:shadow-md transition-shadow duration-200 rounded py-2 px-6 text-lg inline-block mr-2"
          onClick={() => {
            service.send({ type: "CORRECT" });
          }}
        >
          Correct
        </FormButton>
      </div>
      <FormButton
        className="border-2 shadow hover:shadow-md transition-shadow duration-200 rounded py-2 px-6 text-lg mr-2 inline-block"
        onClick={() => {
          service.send({ type: "WRONG" });
        }}
      >
        Wrong
      </FormButton>
    </div>
  );
};

export default RecountTheDream;
