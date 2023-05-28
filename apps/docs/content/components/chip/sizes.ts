const App = `import {Chip} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip size="xs">Chip</Chip>
      <Chip size="sm">Chip</Chip>
      <Chip size="md">Chip</Chip>
      <Chip size="lg">Chip</Chip>
      <Chip size="xl">Chip</Chip>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
