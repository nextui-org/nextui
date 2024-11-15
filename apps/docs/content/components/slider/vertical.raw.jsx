import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-row  max-w-md h-[348px] gap-6 w-full">
      <Slider
        aria-label="Temperature"
        defaultValue={0.2}
        maxValue={1}
        minValue={0}
        orientation="vertical"
        size="sm"
        step={0.01}
      />
      <Slider
        aria-label="Temperature"
        defaultValue={0.4}
        maxValue={1}
        minValue={0}
        orientation="vertical"
        size="md"
        step={0.01}
      />
      <Slider
        aria-label="Temperature"
        defaultValue={0.6}
        maxValue={1}
        minValue={0}
        orientation="vertical"
        size="lg"
        step={0.01}
      />
    </div>
  );
}
