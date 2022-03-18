const App = `import { Switch, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Switch color="primary" checked={true} />
      </Grid>
      <Grid>
        <Switch color="secondary" checked={true} />
      </Grid>
      <Grid>
        <Switch color="success" checked={true} />
      </Grid>
      <Grid>
        <Switch color="warning" checked={true} />
      </Grid>
      <Grid>
        <Switch color="error" checked={true} />
      </Grid>
    </Grid.Container>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
