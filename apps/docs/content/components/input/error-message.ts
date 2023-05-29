const App = `import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      type="email"
      label="Email"
      variant="bordered"
      defaultValue="junior2nextui.org"
      validationState="invalid"
      errorMessage="Please enter a valid email"
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
