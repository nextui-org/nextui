const App = `import { Button, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Button size="xs">Mini</Button>
      <Spacer y={0.5} />
      <Button size="sm">Small</Button>
      <Spacer y={0.5} />
      <Button>Medium</Button>
      <Spacer y={0.5} />
      <Button size="lg">Large</Button>
      <Spacer y={0.5} />
      <Button size="xl">Xlarge</Button>
      <Spacer y={0.5} />
      <Button auto>Auto Width</Button>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
