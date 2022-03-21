const App = `import { Progress, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} sm={6} gap={2}>
      <Grid>
        <Progress value={50} shadow color="primary" status="primary" />
      </Grid>
      <Grid>
        <Progress value={30} shadow color="secondary" status="secondary" />
      </Grid>
      <Grid>
        <Progress value={70} shadow color="success" status="success" />
      </Grid>
      <Grid>
        <Progress value={90} shadow color="warning" status="warning" />
      </Grid>
      <Grid>
        <Progress value={10} shadow color="error" status="error" />
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
