import {Label, Slider} from "@heroui/react";

export function WithStepsAndMarks() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={0.4} maxValue={1} step={0.1}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Steps />
        <Slider.Thumb />
      </Slider.Track>
      <Slider.Marks>
        <Slider.Mark value={0} />
        <Slider.Mark value={0.5} />
        <Slider.Mark value={1} />
      </Slider.Marks>
    </Slider>
  );
}
