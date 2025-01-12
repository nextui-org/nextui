import {CheckboxGroup, Checkbox} from "@heroui/react";

export default function App() {
  const [selected, setSelected] = React.useState(["buenos-aires", "sydney"]);

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        color="warning"
        label="Select cities"
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
}
