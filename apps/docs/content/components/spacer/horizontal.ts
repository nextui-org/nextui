const AppJs = `import { Spacer, Card } from "@nextui-org/react";

export default function App() {
  return (
    <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
      <Card color="primary" />
      <Spacer x={2} />
      <Card color="primary" />
    </Container>
  );
}`;

const react = {
  '/App.js': AppJs
};

export default {
  ...react
};
