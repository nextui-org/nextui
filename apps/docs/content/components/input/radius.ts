const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const radius = [
    "full",
    "xl",
    "lg",
    "md",
    "sm",
    "base",
    "none",
  ];

  return (
    <div className="w-full flex flex-row gap-4">
      {radius.map((r) => (
        <Input
          key={r}
          radius={r}
          type="email"
          label="Email"
          placeholder="Enter your email"
          defaultValue="junior@nextui.org"
          className="min-w-[220px]"
        />
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
