const App = `import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <Card css={{ mw: "400px" }}>
      <Card.Body>
        <Text>A basic card</Text>
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
