const App = `import { Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Button auto color="primary" rounded>
          Primary
        </Button>
      </Grid>
      <Grid>
        <Button auto color="secondary" rounded flat>
          Secondary
        </Button>
      </Grid>
      <Grid>
        <Button auto color="success" rounded bordered>
          Success
        </Button>
      </Grid>
      <Grid>
        <Button auto color="warning" rounded flat>
          Warning
        </Button>
      </Grid>
      <Grid>
        <Button auto color="error" rounded bordered>
          Error
        </Button>
      </Grid>
      <Grid>
        <Button auto color="gradient" rounded bordered>
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
