const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Sizes" defaultValue="md">
      <Radio value="xs" size="xs">
        mini
      </Radio>
      <Radio value="sm" size="sm">
        small
      </Radio>
      <Radio value="md" size="md">
        medium
      </Radio>
      <Radio value="lg" size="lg">
        large
      </Radio>
      <Radio value="xl" size="xl">
        xlarge
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
