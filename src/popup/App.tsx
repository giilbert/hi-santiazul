import { useState } from "react";
import { $$tabAction } from "./tab-action";

const changeColor = $$tabAction((color: string) => {
  document.body.style.color = color;
  return document.title;
});

export const App: React.FC = () => {
  const [returnValue, setReturnValue] = useState("");

  return (
    <>
      <h1>Hello!</h1>
      <div>This is a React App!</div>

      <button
        onClick={async () => {
          const returned = await changeColor("green");
          setReturnValue(returned);
        }}
      >
        Turn shit green
      </button>

      <p>last function return value: {returnValue}</p>
    </>
  );
};
