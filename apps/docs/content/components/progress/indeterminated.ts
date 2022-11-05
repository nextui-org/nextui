const App = `import { Progress, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} sm={6} gap={2}>
      <Grid>
        <Progress
          indeterminated
          value={50}
          color="secondary"
          status="secondary"
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
