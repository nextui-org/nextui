const App = `import { Button, Grid, Loading } from "@nextui-org/react";
export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
          <Loading color="currentColor" size="sm" />
        </Button>
      </Grid>
      <Grid>
        <Button disabled auto bordered color="secondary" css={{ px: "$13" }}>
          <Loading type="spinner" color="currentColor" size="sm" />
        </Button>
      </Grid>
      <Grid>
        <Button disabled auto bordered color="success" css={{ px: "$13" }}>
          <Loading type="points" color="currentColor" size="sm" />
        </Button>
      </Grid>
      <Grid>
        <Button disabled auto bordered color="warning" css={{ px: "$13" }}>
          <Loading type="points-opacity" color="currentColor" size="sm" />
        </Button>
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
