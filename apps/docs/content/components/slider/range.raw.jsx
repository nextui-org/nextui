import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      defaultValue={[100, 500]}
      formatOptions={{style: "currency", currency: "USD"}}
      label="Price Range"
      maxValue={1000}
      minValue={0}
      step={50}
    />
  );
}
