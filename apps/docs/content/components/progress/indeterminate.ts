const App = `import { Progress } from "@nextui-org/react";

export default function App() {
  return (
    <Progress
      size="xs"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
