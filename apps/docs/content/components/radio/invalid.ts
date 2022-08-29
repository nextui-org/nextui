const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Options" defaultValue="A" validationState="invalid">
      <Radio value="A" description="Description for Option A">
        Option A
      </Radio>
      <Radio value="B" description="Description for Option B">
        Option B
      </Radio>
      <Radio value="C" description="Description for Option C">
        Option C
      </Radio>
      <Radio value="D" description="Description for Option D">
        Option D
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
