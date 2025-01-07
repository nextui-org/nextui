import {Slider} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Slider
        aria-label="Temperature"
        className="max-w-md"
        defaultValue={0.2}
        maxValue={1}
        minValue={0}
        size="sm"
        step={0.01}
      />
      <Slider
        aria-label="Temperature"
        className="max-w-md"
        defaultValue={0.4}
        maxValue={1}
        minValue={0}
        size="md"
        step={0.01}
      />
      <Slider
        aria-label="Temperature"
        className="max-w-md"
        defaultValue={0.6}
        maxValue={1}
        minValue={0}
        size="lg"
        step={0.01}
      />
    </div>
  );
}
