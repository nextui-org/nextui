const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Label colors" defaultValue="primary" orientation="horizontal">
      <Radio value="primary" color="primary" labelColor="primary">
        primary
      </Radio>
      <Radio value="secondary" color="secondary" labelColor="secondary">
        secondary
      </Radio>
      <Radio value="success" color="success" labelColor="success">
        success
      </Radio>
      <Radio value="warning" color="warning" labelColor="warning">
        warning
      </Radio>
      <Radio value="error" color="error" labelColor="error">
        error
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
