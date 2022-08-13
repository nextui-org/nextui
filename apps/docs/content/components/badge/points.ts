const App = `import { Badge, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge variant="points" />
      </Grid>
      <Grid>
        <Badge color="primary" variant="points" />
      </Grid>
      <Grid>
        <Badge color="secondary" variant="points" />
      </Grid>
      <Grid>
        <Badge color="success" variant="points" />
      </Grid>
      <Grid>
        <Badge color="warning" variant="points" />
      </Grid>
      <Grid>
        <Badge color="error" variant="points" />
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
