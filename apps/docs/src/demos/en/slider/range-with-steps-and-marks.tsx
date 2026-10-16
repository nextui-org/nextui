"use client";

import {Label, Slider} from "@heroui/react";

export function RangeWithStepsAndMarks() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={[0.2, 0.8]} maxValue={1} step={0.1}>
      <Label>Range</Label>
      <Slider.Output />
      <Slider.Track>
        {({state}) => (
          <>
            <Slider.Fill />
            <Slider.Steps />
            {state.values.map((_, index) => (
              <Slider.Thumb key={index} index={index} />
            ))}
          </>
        )}
      </Slider.Track>
      <Slider.Marks>
        <Slider.Mark value={0} />
        <Slider.Mark value={0.5} />
        <Slider.Mark value={1} />
      </Slider.Marks>
    </Slider>
  );
}
