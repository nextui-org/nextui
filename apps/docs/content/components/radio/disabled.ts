const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Options" defaultValue="1">
      <Radio value="1">Option 1</Radio>
      <Radio value="2" isDisabled>
        Option 2
      </Radio>
      <Radio value="3">Option 3</Radio>
      <Radio value="4" isDisabled>
        Option 4
      </Radio>
    </Radio.Group>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
