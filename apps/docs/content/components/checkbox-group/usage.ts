const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return (
    <CheckboxGroup defaultValue={["buenos-aires", "london"]}>
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
