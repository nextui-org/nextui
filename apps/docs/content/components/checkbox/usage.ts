const App = `import {Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <Checkbox defaultSelected>Option</Checkbox>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
