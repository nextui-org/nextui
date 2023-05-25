const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected size="xs">Option</Checkbox>
      <Checkbox defaultSelected size="sm">Option</Checkbox>
      <Checkbox defaultSelected size="md">Option</Checkbox>
      <Checkbox defaultSelected size="lg">Option</Checkbox>
      <Checkbox defaultSelected size="xl">Option</Checkbox>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
