const App = `import { Kbd } from "@nextui-org/react";

export default function App() {
  return (
    <Kbd keys={["command"]}>K</Kbd>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
