const App = `import React from 'react'
import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState(true);

  return (
    <>
      <Checkbox defaultSelected color="success">Subscribe (uncontrolled)</Checkbox>
      <Spacer x={1} />
      <Checkbox isSelected={selected} color="success" onChange={setSelected} >
        Subscribe (controlled)
      </Checkbox>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
