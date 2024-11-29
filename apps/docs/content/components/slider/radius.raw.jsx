import {Slider} from "@nextui-org/react";

export default function App() {
  const radius = ["full", "lg", "md", "sm", "none"];

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {radius.map((r) => (
        <Slider
          key={r}
          aria-label="Temperature"
          className="max-w-md"
          defaultValue={0.7}
          maxValue={1}
          minValue={0}
          radius={r}
          step={0.01}
        />
      ))}
    </div>
  );
}
