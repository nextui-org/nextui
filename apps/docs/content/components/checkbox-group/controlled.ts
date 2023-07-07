const App = `import {CheckboxGroup, Checkbox} from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState(["buenos-aires", "sydney"]);

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        label="Select cities"
        color="warning"
        value={selected}
        onValueChange={setSelected}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">Selected: {selected.join(", ")}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
