const App = `import { Tooltip, Link, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Tooltip
          content={"Developers love Next.js"}
          trigger="click"
          color="primary"
        >
          <Link>
            Click me
          </Link>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content={"Developers love Next.js"}
          trigger="hover"
          color="secondary"
        >
          <Link color="secondary">
            Hover me
          </Link>
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
