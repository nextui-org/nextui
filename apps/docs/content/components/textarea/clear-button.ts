const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      isClearable
      label="Email"
      variant="bordered"
      placeholder="Enter your email"
      defaultValue="junior@nextui.org"
      onClear={() => console.log("textarea cleared")}
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
