const App = `import { Progress, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} sm={6} gap={2}>
      <Grid>
        <Progress color="primary" animated={false} value={200} max={250} />
      </Grid>
      <Grid>
        <Progress color="primary" animated={false} value={45} />
      </Grid>
      <Grid>
        <Progress color="primary" animated={false} value={29} />
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
