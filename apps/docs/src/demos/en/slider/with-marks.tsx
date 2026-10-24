import {Label, Slider} from "@heroui/react";

export function WithMarks() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={40}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
      <Slider.Marks>
        <Slider.Mark value={0}>Off</Slider.Mark>
        <Slider.Mark value={20}>Quiet</Slider.Mark>
        <Slider.Mark value={60}>Loud</Slider.Mark>
        <Slider.Mark value={100}>Max</Slider.Mark>
      </Slider.Marks>
    </Slider>
  );
}
