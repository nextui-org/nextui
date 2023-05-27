const App = `import { Spinner } from "@nextui-org/react";

export default function App() {
  return (
    <Spinner label="Loading..." color="warning" />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
