import {Label, Slider} from "@heroui/react";

export function WithMarks() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={40}>
      <Label>音量</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
      <Slider.Marks>
        <Slider.Mark value={0}>关闭</Slider.Mark>
        <Slider.Mark value={20}>轻声</Slider.Mark>
        <Slider.Mark value={60}>响亮</Slider.Mark>
        <Slider.Mark value={100}>最大</Slider.Mark>
      </Slider.Marks>
    </Slider>
  );
}
