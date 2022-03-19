const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group value="1">
      <Radio 
        value="1"
      >
        Option 1
      </Radio>
      <Radio 
        value="2" 
        disabled
      >
        Option 2
      </Radio>
      <Radio 
        value="3"
      >
        Option 3
      </Radio>
      <Radio 
        value="4" 
        disabled
      >
        Option 4
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
