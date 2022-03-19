const App = `import { Radio, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group row value="primary">
      <Radio 
        value="primary" 
        color="primary" 
        textColor="primary"
      >
        Primary
      </Radio>
      <Spacer />
      <Radio 
        value="secondary" 
        color="secondary" 
        textColor="secondary"
      >
        Secondary
      </Radio>
      <Spacer />
      <Radio 
        value="success" 
        color="success" 
        textColor="success"
      >
        Success
      </Radio>
      <Spacer />
      <Radio 
        value="warning" 
        color="warning" 
        textColor="warning"
      >
        Warning
      </Radio>
      <Spacer />
      <Radio 
        value="error" 
        color="error" 
        textColor="error"
      >
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
