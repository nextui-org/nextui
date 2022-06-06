const App = `import { Card, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>A hoverable card.</Text>
      </Card.Body>
    </Card>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
