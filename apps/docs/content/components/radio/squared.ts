const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group value="1">
      <Radio 
        value="1" 
        squared
      >
        Option 1
      </Radio>
      <Radio 
        value="2" 
        squared
      >
        Option 2
      </Radio>
      <Radio 
        value="3" 
        squared
      >
        Option 3
      </Radio>
      <Radio 
        value="4" 
        squared
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
