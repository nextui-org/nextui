const App = `import { Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Button color="primary" auto>
          Primary
        </Button>
      </Grid>
      <Grid>
        <Button color="secondary" auto>
          Secondary
        </Button>
      </Grid>
      <Grid>
        <Button color="success" auto>
          Success
        </Button>
      </Grid>
      <Grid>
        <Button color="warning" auto>
          Warning
        </Button>
      </Grid>
      <Grid>
        <Button color="error" auto>
          Error
        </Button>
      </Grid>
      <Grid>
        <Button color="gradient" auto>
          Gradient
        </Button>
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
