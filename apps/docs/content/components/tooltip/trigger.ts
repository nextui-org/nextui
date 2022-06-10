const App = `import { Tooltip, Grid, Card } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Tooltip
          content={"Developers love Next.js"}
          trigger="click"
          color="primary"
        >
          <Card>
            Click me
          </Card>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content={"Developers love Next.js"}
          trigger="hover"
          color="secondary"
        >
          <Button auto flat color="secondary">
            Hover me
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
