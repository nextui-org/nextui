const App = `import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      isReadOnly
      type="email"
      label="Email"
      variant="bordered"
      defaultValue="junior@nextui.org"
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
