const App = `import { Badge, Text, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={0.5}>
      <Grid xs={12} alignItems="center">
        <Badge variant="dot" />
        <Text css={{ ml: "$2" }}>Default</Text>
      </Grid>
      <Grid xs={12} alignItems="center">
        <Badge color="primary" variant="dot" />
        <Text css={{ ml: "$2" }}>Primary</Text>
      </Grid>
      <Grid xs={12} alignItems="center">
        <Badge color="secondary" variant="dot" />
        <Text css={{ ml: "$2" }}>Secondary</Text>
      </Grid>
      <Grid xs={12} alignItems="center">
        <Badge color="success" variant="dot" />
        <Text css={{ ml: "$2" }}>Success</Text>
      </Grid>
      <Grid xs={12} alignItems="center">
        <Badge color="warning" variant="dot" />
        <Text css={{ ml: "$2" }}>Warning</Text>
      </Grid>
      <Grid xs={12} alignItems="center">
        <Badge color="error" variant="dot" />
        <Text css={{ ml: "$2" }}>Error</Text>
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
