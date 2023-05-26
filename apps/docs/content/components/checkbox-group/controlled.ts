const App = `import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState(["buenos-aires", "sydney"]);

  return (
    <CheckboxGroup
      label="Select cities"
      color="warning"
      value={selected}
      onChange={setSelected}
    >
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
    </CheckboxGroup>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
