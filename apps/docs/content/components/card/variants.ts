const App = `import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid xs={4}>
        <Card>
          <Card.Body>
            <Text>Default card. (shadow)</Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card variant="flat">
          <Card.Body>
            <Text>Flat card.</Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card variant="bordered">
          <Card.Body>
            <Text>Bordered card.</Text>
          </Card.Body>
        </Card>
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
