const App = `import { Card, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{ mw: "400px" }}
    >
      <Card.Body>
        <Text>A pressable card.</Text>
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
