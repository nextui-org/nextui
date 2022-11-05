const App = `import { Badge, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge variant="flat">Neutral</Badge>
      </Grid>
      <Grid>
        <Badge color="primary" variant="flat">
          Primary
        </Badge>
      </Grid>
      <Grid>
        <Badge color="secondary" variant="flat">
          Secondary
        </Badge>
      </Grid>
      <Grid>
        <Badge color="success" variant="flat">
          Success
        </Badge>
      </Grid>
      <Grid>
        <Badge color="warning" variant="flat">
          Warning
        </Badge>
      </Grid>
      <Grid>
        <Badge color="error" variant="flat">
          Error
        </Badge>
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
