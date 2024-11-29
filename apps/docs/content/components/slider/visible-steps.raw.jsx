import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Slider
        className="max-w-md"
        color="foreground"
        defaultValue={0.2}
        label="Temperature"
        maxValue={1}
        minValue={0}
        showSteps={true}
        size="sm"
        step={0.1}
      />
      <Slider
        className="max-w-md"
        color="foreground"
        defaultValue={0.4}
        label="Temperature"
        maxValue={1}
        minValue={0}
        showSteps={true}
        size="md"
        step={0.1}
      />
      <Slider
        className="max-w-md"
        color="foreground"
        defaultValue={0.6}
        label="Temperature"
        maxValue={1}
        minValue={0}
        showSteps={true}
        size="lg"
        step={0.1}
      />
    </div>
  );
}
