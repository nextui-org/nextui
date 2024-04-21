const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      label="Description"
      placeholder="Enter your description"
      className="max-w-xs"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
