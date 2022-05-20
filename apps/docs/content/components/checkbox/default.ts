const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return <Checkbox defaultSelected={true}>Option</Checkbox>;
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
