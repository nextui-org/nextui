const App = `import React from 'react'
import { Checkbox, Text, Spacer } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState([]);

  return (
    <>
      <Checkbox.Group
        label="Select cities"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="auckland">Auckland</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
      </Checkbox.Group>
      <Spacer y={1} />
      <Text>You're going to visit: {selected.join(', ')}</Text>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
