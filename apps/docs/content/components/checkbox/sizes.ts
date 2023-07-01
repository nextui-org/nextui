const App = `import {Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected size="sm">Small</Checkbox>
      <Checkbox defaultSelected size="md">Medium</Checkbox>
      <Checkbox defaultSelected size="lg">Large</Checkbox>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
