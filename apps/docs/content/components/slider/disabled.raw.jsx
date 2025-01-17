import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      isDisabled
      className="max-w-md"
      defaultValue={0.6}
      label="Temperature"
      maxValue={1}
      minValue={0}
      step={0.01}
    />
  );
}
