import type { NextPage } from "next";
import Title from "./helpers/Title";
import FormButton from "./helpers/FormButton";

const WaitingRoom: NextPage<{ service: any }> = ({ service }) => {
  return (
    <div>
      <div className="pt-4">
        <Title>Checkout what Dream Spirit you are!</Title>
      </div>
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

export default WaitingRoom;
