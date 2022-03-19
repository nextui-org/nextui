const App = `import { Loading, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Loading type="default" />
      </Grid>
      <Grid>
        <Loading type="spinner" size="lg" />
      </Grid>
      <Grid>
        <Loading type="points" />
      </Grid>
      <Grid>
        <Loading type="points-opacity" />
      </Grid>
      <Grid>
        <Loading type="gradient" />
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

