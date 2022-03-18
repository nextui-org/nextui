const App = `import { Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Button light color="primary" auto>
          Primary
        </Button>
      </Grid>
      <Grid>
        <Button light color="secondary" auto>
          Secondary
        </Button>
      </Grid>
      <Grid>
        <Button light color="success" auto>
          Success
        </Button>
      </Grid>
      <Grid>
        <Button light color="warning" auto>
          Warning
        </Button>
      </Grid>
      <Grid>
        <Button light color="error" auto>
          Error
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
