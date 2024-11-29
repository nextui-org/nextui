import {CheckboxGroup, Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <CheckboxGroup
      color="secondary"
      defaultValue={["buenos-aires", "san-francisco"]}
      label="Select cities"
      orientation="horizontal"
    >
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  );
}
