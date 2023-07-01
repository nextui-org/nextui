const App = `import {Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected radius="full">Full</Checkbox>
      <Checkbox defaultSelected radius="lg">Large</Checkbox>
      <Checkbox defaultSelected radius="md">Medium</Checkbox>
      <Checkbox defaultSelected radius="sm">Small</Checkbox>
      <Checkbox defaultSelected radius="none">None</Checkbox>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
