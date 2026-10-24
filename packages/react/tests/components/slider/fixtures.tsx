import type {ComponentProps} from "react";

import {Label} from "@/components/label";
import {Slider} from "@/components/slider";

export function SliderIndicatorsFixture({
  marks = [0, 25, 50, 75, 100],
  ...props
}: ComponentProps<typeof Slider> & {marks?: number[]}) {
  return (
    <Slider defaultValue={50} step={25} {...props}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        {({state}) => (
          <>
            <Slider.Steps />
            <Slider.Fill />
            {state.values.map((_, index) => (
              <Slider.Thumb key={index} index={index} />
            ))}
          </>
        )}
      </Slider.Track>
      <Slider.Marks>
        {marks.map((value) => (
          <Slider.Mark key={value} value={value} />
        ))}
      </Slider.Marks>
    </Slider>
  );
}
