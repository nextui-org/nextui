const App = `import { Textarea, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2.5}>
      <Grid>
        <Textarea placeholder="Static rows, rows (4)" rows={4} />
      </Grid>
      <Grid>
        <Textarea
          placeholder="Min rows (2), write something large.."
          minRows={2}
        />
      </Grid>
      <Grid>
        <Textarea
          placeholder="Max rows (10), Min rows (1), write something large.."
          minRows={1}
          maxRows={10}
        />
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
