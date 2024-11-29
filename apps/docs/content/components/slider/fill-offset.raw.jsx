import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      color="warning"
      defaultValue={1.5}
      fillOffset={0}
      formatOptions={{signDisplay: "always"}}
      label="Exposure"
      maxValue={5}
      minValue={-5}
      size="sm"
      step={0.01}
    />
  );
}
