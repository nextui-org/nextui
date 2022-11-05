const App = `import { Badge, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge>Neutral</Badge>
      </Grid>
      <Grid>
        <Badge color="primary">Primary</Badge>
      </Grid>
      <Grid>
        <Badge color="secondary">Secondary</Badge>
      </Grid>
      <Grid>
        <Badge color="success">Success</Badge>
      </Grid>
      <Grid>
        <Badge color="warning">Warning</Badge>
      </Grid>
      <Grid>
        <Badge color="error">Error</Badge>
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
