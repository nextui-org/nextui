const App = `import {RadioGroup, Radio} from "@nextui-org/react";

export default function App() {
  const [selected, setSelected] = React.useState("london");

  const validOptions = ["buenos-aires", "san-francisco", "tokyo"];

  const isInvalid = !validOptions.includes(selected);

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        label="Select your favorite city"
        value={selected}
        isInvalid={isInvalid}
        onValueChange={setSelected}
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="san-francisco">San Francisco</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <p className="text-default-500 text-small">Selected: {selected}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
