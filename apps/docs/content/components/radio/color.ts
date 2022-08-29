const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group orientation="horizontal" label="Colors" defaultValue="primary" >
      <Radio value="primary" color="primary">
        primary
      </Radio>
      <Radio value="secondary" color="secondary">
        secondary
      </Radio>
      <Radio value="success" color="success">
        success
      </Radio>
      <Radio value="warning" color="warning">
        warning
      </Radio>
      <Radio value="error" color="error">
        error
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
