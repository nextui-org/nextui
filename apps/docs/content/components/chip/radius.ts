const App = `import { Chip } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip radius="full">Chip</Chip>
      <Chip radius="lg">Chip</Chip>
      <Chip radius="md">Chip</Chip>
      <Chip radius="sm">Chip</Chip>
      <Chip radius="none">Chip</Chip>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
