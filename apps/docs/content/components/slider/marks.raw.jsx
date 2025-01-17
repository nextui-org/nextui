import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      color="foreground"
      defaultValue={20}
      label="Select a value"
      marks={[
        {
          value: 20,
          label: "20%",
        },
        {
          value: 50,
          label: "50%",
        },
        {
          value: 80,
          label: "80%",
        },
      ]}
      size="sm"
      step={10}
    />
  );
}
