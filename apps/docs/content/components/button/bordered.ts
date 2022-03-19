const App = `import { Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Button bordered color="primary" auto>
          Primary
        </Button>
      </Grid>
      <Grid>
        <Button bordered color="secondary" auto>
          Secondary
        </Button>
      </Grid>
      <Grid>
        <Button bordered color="success" auto>
          Success
        </Button>
      </Grid>
      <Grid>
        <Button bordered color="warning" auto>
          Warning
        </Button>
      </Grid>
      <Grid>
        <Button bordered color="error" auto>
          Error
        </Button>
      </Grid>
      <Grid>
        <Button bordered color="gradient" auto>
          Gradient
        </Button>
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
