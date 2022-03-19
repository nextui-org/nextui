const App = `import { Progress, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} sm={6} gap={2}>
      <Grid>
        <Progress color="primary" size="xs" value={68} />
      </Grid>
      <Grid>
        <Progress color="primary" size="sm" value={72} />
      </Grid>
      <Grid>
        <Progress color="primary" size="md" value={74} />
      </Grid>
      <Grid>
        <Progress color="primary" size="lg" value={76} />
      </Grid>
      <Grid>
        <Progress color="primary" size="xl" value={78} />
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
