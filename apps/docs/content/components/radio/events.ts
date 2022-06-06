const App = `import React from 'react'
import { Radio, Text, Spacer } from "@nextui-org/react";

export default function App() {
  const [checked, setChecked] = React.useState('');

  return (
    <>
      <Radio.Group 
        label="Options"
        value={checked}
        onChange={setChecked}
      >
        <Radio value="A">Option A</Radio>
        <Radio value="B">Option B</Radio>
        <Radio value="C">Option C</Radio>
        <Radio value="D">Option D</Radio>
      </Radio.Group>
      <Spacer y={1} />
      <Text>You've checked: {checked}</Text>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
