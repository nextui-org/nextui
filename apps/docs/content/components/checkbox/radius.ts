const App = `import {Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected radius="full">Option</Checkbox>
      <Checkbox defaultSelected radius="lg">Option</Checkbox>
      <Checkbox defaultSelected radius="md">Option</Checkbox>
      <Checkbox defaultSelected radius="sm">Option</Checkbox>
      <Checkbox defaultSelected radius="none">Option</Checkbox>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
