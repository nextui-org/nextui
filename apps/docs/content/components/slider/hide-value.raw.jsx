import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      color="danger"
      defaultValue={0.4}
      hideValue={true}
      label="Temperature"
      maxValue={1}
      minValue={0}
      step={0.01}
    />
  );
}
