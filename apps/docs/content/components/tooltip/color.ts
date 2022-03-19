const App = `import { Tooltip, Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Tooltip content="Developers love Next.js">
          <Button light auto>
            Default
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip content="Developers love Next.js" color="invert">
          <Button light auto>
            Invert
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip content="Developers love Next.js" color="primary">
          <Button flat auto>
            Primary
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip content="Developers love Next.js" color="secondary">
          <Button flat auto color="secondary">
            Secondary
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip content="Developers love Next.js" color="success">
          <Button flat auto color="success">
            Success
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip content="Developers love Next.js" color="warning">
          <Button flat auto color="warning">
            Warning
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip content="Developers love Next.js" color="error">
          <Button flat auto color="error">
            Error
          </Button>
        </Tooltip>
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
