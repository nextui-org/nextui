const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input animated={false} labelPlaceholder="Default" status="default" />
      </Grid>
      <Grid>
        <Input
          underlined
          animated={false}
          labelPlaceholder="Primary"
          color="primary"
        />
      </Grid>
      <Grid>
        <Input
          bordered
          animated={false}
          labelPlaceholder="Secondary"
          color="secondary"
        />
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
