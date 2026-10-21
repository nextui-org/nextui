import {Label, Slider} from "@heroui/react";

export function CustomValueFormatting() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={60}
      formatOptions={{currency: "USD", style: "currency"}}
    >
      <Label>价格</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
