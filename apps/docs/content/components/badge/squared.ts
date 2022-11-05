const App = `import { Badge, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge isSquared>Neutral</Badge>
      </Grid>
      <Grid>
        <Badge isSquared color="primary" variant="bordered">
          Primary
        </Badge>
      </Grid>
      <Grid>
        <Badge isSquared color="secondary" variant="flat">
          Secondary
        </Badge>
      </Grid>
      <Grid>
        <Badge isSquared color="success">
          Success
        </Badge>
      </Grid>
      <Grid>
        <Badge isSquared color="warning" variant="bordered">
          Warning
        </Badge>
      </Grid>
      <Grid>
        <Badge isSquared color="error" variant="flat">
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
