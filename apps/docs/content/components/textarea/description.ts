const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      variant="faded"
      label="Description"
      placeholder="Enter your description"
      description="Enter a concise description of your project."
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
