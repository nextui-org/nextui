const App = `import { Radio, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group row value="primary">
      <Radio value="primary" color="primary">
        Primary
      </Radio>
      <Spacer />
      <Radio value="secondary" color="secondary">
        Secondary
      </Radio>
      <Spacer />
      <Radio value="success" color="success">
        Success
      </Radio>
      <Spacer />
      <Radio value="warning" color="warning">
        Warning
      </Radio>
      <Spacer />
      <Radio value="error" color="error">
        Error
      </Radio>
    </Radio.Group>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
