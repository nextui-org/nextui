const AppJs = `import { Spacer, Card } from "@nextui-org/react";

export default function App() {
  return (
    <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body />
      </Card>
      <Spacer x={2} />
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body />
      </Card>
    </Container>
  );
}`;

const react = {
  "/App.js": AppJs,
};

export default {
  ...react,
};
