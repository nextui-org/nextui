const App = `import { Pagination, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} gap={2}>
      <Grid>
        <Pagination bordered total={10} initialPage={6} />
      </Grid>
      <Grid>
        <Pagination rounded bordered total={10} initialPage={6} />
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
