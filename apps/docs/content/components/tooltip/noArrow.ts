const App = `import { Tooltip, Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container>
      <Grid>
        <Tooltip content={"Developers love Next.js"} color="primary" hideArrow>
          <Button auto flat>
            Do hover me
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
