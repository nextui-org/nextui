import {Label, Slider} from "@heroui/react";

export function VerticalWithStepsAndMarks() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Slider className="h-full" defaultValue={0.4} maxValue={1} orientation="vertical" step={0.1}>
        <Label>音量</Label>
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
    </div>
  );
}
