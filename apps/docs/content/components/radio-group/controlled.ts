const App = `import {RadioGroup, Radio} from "@nextui-org/react";

export default function App() {
  const [selectedItem, setSelectedItem] = React.useState("london");


  return (
    <RadioGroup
      label="Select your favorite city"
      value={selectedItem}
      onValueChange={setSelectedItem}
    >
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
