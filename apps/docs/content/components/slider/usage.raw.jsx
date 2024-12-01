import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      defaultValue={0.4}
      label="Temperature"
      maxValue={1}
      minValue={0}
      step={0.01}
    />
  );
}
