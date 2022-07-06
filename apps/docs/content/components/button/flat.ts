const App = `import { Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Button flat color="primary" auto>
          Primary
        </Button>
      </Grid>
      <Grid>
        <Button flat color="secondary" auto>
          Secondary
        </Button>
      </Grid>
      <Grid>
        <Button flat color="success" auto>
          Success
        </Button>
      </Grid>
      <Grid>
        <Button flat color="warning" auto>
          Warning
        </Button>
      </Grid>
      <Grid>
        <Button flat color="error" auto>
          Error
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
