const App = `import { Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container direction="vertical">
      <Grid xs={12}>
        <Button.Group size="xs">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      </Grid>
      <Grid>
        <Button.Group size="sm">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      </Grid>
      <Grid xs={12}>
        <Button.Group size="md">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      </Grid>
      <Grid xs={12}>
        <Button.Group size="lg">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      </Grid>
      <Grid xs={12}>
        <Button.Group size="xl">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
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
