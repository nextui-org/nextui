const App = `import { Badge, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge variant="bordered">Neutral</Badge>
      </Grid>
      <Grid>
        <Badge color="primary" variant="bordered">
          Primary
        </Badge>
      </Grid>
      <Grid>
        <Badge color="secondary" variant="bordered">
          Secondary
        </Badge>
      </Grid>
      <Grid>
        <Badge color="success" variant="bordered">
          Success
        </Badge>
      </Grid>
      <Grid>
        <Badge color="warning" variant="bordered">
          Warning
        </Badge>
      </Grid>
      <Grid>
        <Badge color="error" variant="bordered">
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
