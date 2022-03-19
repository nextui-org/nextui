const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group value="1">
      <Radio value="1">
        Option 1
        <Radio.Description>
          Description for Option1
        </Radio.Description>
      </Radio>
      <Radio value="2">
        Option 2
        <Radio.Desc>
          Description for Option2
        </Radio.Desc>
      </Radio>
      <Radio value="3">
        Option 3
          <Radio.Desc>
            Description for Option2
          </Radio.Desc>
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
