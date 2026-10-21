"use client";

import {Label, Slider} from "@heroui/react";

export function CustomOutput() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={[25, 75]}>
      <Label>区间</Label>
      <Slider.Output>
        {({state}) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
      </Slider.Output>
      <Slider.Track>
        {({state}) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>
  );
}
