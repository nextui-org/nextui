const AppJs = `import { Spacer, Card } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Spacer y={1} />
        </Card.Body>
      </Card>
      <Spacer y={1} />
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Spacer y={2} />
        </Card.Body>
      </Card>
      <Spacer y={1} />
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Spacer y={3} />
        </Card.Body>
      </Card>
    </>
  );
}
`;

const react = {
  '/App.js': AppJs
};

export default {
  ...react
};
