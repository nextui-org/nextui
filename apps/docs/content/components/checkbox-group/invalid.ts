const App = `import {CheckboxGroup, Checkbox} from "@nextui-org/react";

export default function App() {
  const [isInvalid, setIsInvalid] = React.useState(true);

  return (
    <CheckboxGroup
      isRequired
      description="Select the cities you want to visit"
      isInvalid={isInvalid}
      label="Select cities"
      onValueChange={(value) => {
        setIsInvalid(value.length < 1);
      }}
    >
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
