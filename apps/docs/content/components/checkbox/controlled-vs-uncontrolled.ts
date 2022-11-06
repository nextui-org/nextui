const App = `import React from "react";
import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState(true);

  return (
    <>
      <Checkbox isSelected={selected} color="success" onChange={setSelected}>
        Subscribe (controlled)
      </Checkbox>
      <Spacer x={1} />
      <Checkbox defaultSelected={true} color="success">
        Subscribe (uncontrolled)
      </Checkbox>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
