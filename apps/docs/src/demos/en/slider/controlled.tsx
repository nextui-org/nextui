"use client";

import {Label, Slider} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [value, setValue] = useState(25);

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Slider
        value={value}
        onChange={(nextValue) => {
          if (typeof nextValue === "number") {
            setValue(nextValue);
          }
        }}
      >
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <p className="text-sm text-muted">Current value: {value}</p>
    </div>
  );
}
