import {Label, Slider} from "@heroui/react";

export function WithSteps() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={40} step={10}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Steps />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
