const App = `import { Pagination, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Pagination shadow controls={false} total={10} initialPage={6} />
      </Grid>
      <Grid>
        <Pagination
          noMargin
          shadow
          controls={false}
          total={10}
          initialPage={6}
        />
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
