const App = `import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      type="email"
      label="Email"
      defaultValue="junior@nextui.org"
      description="We'll never share your email with anyone else."
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
