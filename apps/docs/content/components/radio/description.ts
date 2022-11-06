const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Options" defaultValue="1">
      <Radio value="1" description="Description for Option1">
        Option 1
      </Radio>
      <Radio value="2" description="Description for Option2">
        Option 2
      </Radio>
      <Radio value="3" description="Description for Option3">
        Option 3
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
