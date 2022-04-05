const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return (
    <Checkbox disabled initialChecked={true}>
      Default
    </Checkbox>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
