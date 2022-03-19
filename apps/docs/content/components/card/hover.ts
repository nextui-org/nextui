const App = `import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <Card bordered shadow={false} hoverable css={{ mw: "400px" }}>
      <p>A hoverable card.</p>
    </Card>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
