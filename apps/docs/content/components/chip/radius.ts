const App = `import {Chip} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip radius="full">Full</Chip>
      <Chip radius="lg">Large</Chip>
      <Chip radius="md">Medium</Chip>
      <Chip radius="sm">Small</Chip>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
