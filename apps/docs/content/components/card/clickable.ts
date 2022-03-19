const App = `import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <Card clickable bordered css={{ mw: "400px" }}>
      <p>A clickable card.</p>
    </Card>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
