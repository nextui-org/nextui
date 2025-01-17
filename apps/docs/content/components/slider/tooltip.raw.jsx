import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      defaultValue={0.2}
      formatOptions={{style: "percent"}}
      label="Select a value"
      marks={[
        {
          value: 0.2,
          label: "20%",
        },
        {
          value: 0.5,
          label: "50%",
        },
        {
          value: 0.8,
          label: "80%",
        },
      ]}
      maxValue={1}
      minValue={0}
      showTooltip={true}
      step={0.1}
    />
  );
}
