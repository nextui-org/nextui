const App = `import {RadioGroup, Radio} from "@nextui-org/react";

export default function App() {
  return (
    <RadioGroup
      label="Select your favorite city"
      color="warning"
    >
      <Radio value="buenos-aires" description="The capital of Argentina">
        Buenos Aires
      </Radio>
      <Radio value="canberra" description="The capital of Australia">
        Canberra
      </Radio>
      <Radio value="london" description="The capital of England">
        London
      </Radio>
      <Radio value="tokyo" description="The capital of Japan">
        Tokyo
      </Radio>
    </RadioGroup>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
