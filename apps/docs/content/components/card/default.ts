const App = `import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <Card css={{ mw: "400px" }}>
      <p>A basic card.</p>
    </Card>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
