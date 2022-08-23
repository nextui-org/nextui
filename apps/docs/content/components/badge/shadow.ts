const App = `import { Badge, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge enableShadow disableOutline>
          Neutral
        </Badge>
      </Grid>
      <Grid>
        <Badge enableShadow disableOutline color="primary">
          Primary
        </Badge>
      </Grid>
      <Grid>
        <Badge enableShadow disableOutline color="secondary">
          Secondary
        </Badge>
      </Grid>
      <Grid>
        <Badge enableShadow disableOutline color="success">
          Success
        </Badge>
      </Grid>
      <Grid>
        <Badge enableShadow disableOutline color="warning">
          Warning
        </Badge>
      </Grid>
      <Grid>
        <Badge enableShadow disableOutline color="error">
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
