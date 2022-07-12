const App = `import React from 'react'
import { Checkbox, Grid } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState(['buenos-aires', 'sydney']);

  return (
    <Grid.Container gap={2}>
      <Grid>
        <Checkbox.Group
          label="Select cities (uncontrolled)"
          defaultValue={['buenos-aires', 'auckland']}
        >
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="auckland">Auckland</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
        </Checkbox.Group>
      </Grid>
      <Grid>
        <Checkbox.Group
          label="Select cities (controlled)"
          color="secondary"
          value={selected}
          onChange={setSelected}
        >
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="auckland">Auckland</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
        </Checkbox.Group>
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
