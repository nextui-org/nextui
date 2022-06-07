const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Options" defaultValue="A">
      <Radio value="A">Option A</Radio>
      <Radio value="B">Option B</Radio>
      <Radio value="C">Option C</Radio>
      <Radio value="D">Option D</Radio>
    </Radio.Group>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
