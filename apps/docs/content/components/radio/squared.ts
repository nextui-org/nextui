const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Options" defaultValue="1">
      <Radio value="1" isSquared>
        Option 1
      </Radio>
      <Radio value="2" isSquared>
        Option 2
      </Radio>
      <Radio value="3" isSquared>
        Option 3
      </Radio>
      <Radio value="4" isSquared>
        Option 4
      </Radio>
    </Radio.Group>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
