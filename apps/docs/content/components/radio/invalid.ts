const App = `import React from "react";
import { Radio } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState('A');

  return (
    <Radio.Group
      label="Options"
      value={selected}
      onChange={setSelected}
      validationState={["A", "C"].includes(selected) ? 'valid' : 'invalid'}
      >
      <Radio value="A" description="A perfectly valid option">
        Option A
      </Radio>
      <Radio value="B" description="Definitely not valid">
        Option B
      </Radio>
      <Radio value="C" description="Another valid option">
        Option C
      </Radio>
      <Radio value="D" description="Uh oh, invalid!">
        Option D
      </Radio>
    </Radio.Group>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
