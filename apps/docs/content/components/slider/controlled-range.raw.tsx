import type {SliderValue} from "@nextui-org/react";

import React from "react";
import {Slider} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState<SliderValue>([100, 300]);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        className="max-w-md"
        formatOptions={{style: "currency", currency: "USD"}}
        label="Select a budget"
        maxValue={1000}
        minValue={0}
        step={10}
        value={value}
        onChange={setValue}
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget: {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
      </p>
    </div>
  );
}
