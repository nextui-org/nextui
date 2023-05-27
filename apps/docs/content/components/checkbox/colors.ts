const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected color="default">default</Checkbox>
      <Checkbox defaultSelected color="primary">Primary</Checkbox>
      <Checkbox defaultSelected color="secondary">Secondary</Checkbox>
      <Checkbox defaultSelected color="success">Success</Checkbox>
      <Checkbox defaultSelected color="warning">Warning</Checkbox>
      <Checkbox defaultSelected color="danger">Danger</Checkbox>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
