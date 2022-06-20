const App = `import { Pagination, Grid, Text, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container xs={12} gap={2}>
      <Grid>
        <Text>1 Sibling (default)</Text>
        <Spacer y={0.4} />
        <Pagination total={14} initialPage={6} />
      </Grid>
      <Grid>
        <Text>2 Siblings</Text>
        <Spacer y={0.4} />
        <Pagination siblings={2} total={14} initialPage={6} />
      </Grid>
      <Grid>
        <Text>3 Siblings</Text>
        <Spacer y={0.4} />
        <Pagination siblings={3} total={14} initialPage={6} />
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
