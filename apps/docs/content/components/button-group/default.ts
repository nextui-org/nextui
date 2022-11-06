const App = `import { Button } from "@nextui-org/react";

export default function App() {
  return (
    <Button.Group>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
