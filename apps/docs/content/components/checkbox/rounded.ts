const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return (
    <Checkbox rounded color="primary" initialChecked={true}>
      Rounded option
    </Checkbox>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
