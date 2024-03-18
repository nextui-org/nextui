const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("you@example.com")

  return (
    <Input
      isClearable
      type="email"
      label="Email"
      variant="bordered"
      placeholder="Enter your email"
      value={value}
      onClear={() => console.log("input cleared")}
      onValueChange={setValue}
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
