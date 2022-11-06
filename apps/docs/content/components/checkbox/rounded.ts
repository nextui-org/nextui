const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  return (
    <Checkbox isRounded defaultSelected color="primary">
      Rounded option
    </Checkbox>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
