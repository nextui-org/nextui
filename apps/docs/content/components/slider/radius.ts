const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  const radius = [
    "full",
    "lg",
    "md",
    "sm",
    "none",
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {radius.map((r) => (
        <Slider
          key={r}
          radius={r}
          step={0.01}
          maxValue={1}
          minValue={0}
          defaultValue={0.7}
          aria-label="Temperature"
          className="max-w-md"
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
