import {Slider} from "@heroui/react";

export default function App() {
  const colors = ["foreground", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {colors.map((color) => (
        <Slider
          key={color}
          aria-label="Temperature"
          className="max-w-md"
          color={color}
          defaultValue={0.7}
          maxValue={1}
          minValue={0}
          step={0.01}
        />
      ))}
    </div>
  );
}
