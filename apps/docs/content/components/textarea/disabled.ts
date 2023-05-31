const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      isDisabled
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
      defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
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
