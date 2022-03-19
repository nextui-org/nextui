const App = `import { Progress, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} sm={6} gap={2}>
      <Grid>
        <Progress value={50} color="primary" status="primary" />
      </Grid>
      <Grid>
        <Progress value={30} color="secondary" status="secondary" />
      </Grid>
      <Grid>
        <Progress value={70} color="success" status="success" />
      </Grid>
      <Grid>
        <Progress value={90} color="warning" status="warning" />
      </Grid>
      <Grid>
        <Progress value={10} color="error" status="error" />
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
