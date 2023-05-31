const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      variant="bordered"
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
      defaultValue="NextUI is a React UI library with..."
      validationState="invalid"
      errorMessage="The description should be at least 255 characters long."
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
