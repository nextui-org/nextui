const App = `import React from 'react'
import { Radio, Grid } from "@nextui-org/react";

export default function App() {
  const [checked, setChecked] = React.useState('B');

  return (
    <Grid.Container gap={2}>
      <Grid>
        <Radio.Group 
          label="Options (controlled)"
          value={checked}
          onChange={setChecked}
        >
          <Radio value="A">Option A</Radio>
          <Radio value="B">Option B</Radio>
          <Radio value="C">Option C</Radio>
          <Radio value="D">Option D</Radio>
        </Radio.Group>
      </Grid>
      <Grid>
        <Radio.Group
          label="Options (uncontrolled)"
          defaultValue="A"
          color="secondary"
        >
          <Radio value="A">Option A</Radio>
          <Radio value="B">Option B</Radio>
          <Radio value="C">Option C</Radio>
          <Radio value="D">Option D</Radio>
        </Radio.Group>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
