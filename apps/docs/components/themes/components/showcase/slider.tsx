import {Slider as NextUISlider} from "@nextui-org/react";

import {ShowcaseComponent} from "../showcase-component";
import {NextUIColor, NextUIRadius, NextUISize} from "../../types";

export function Slider() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Slider" radiuses={radiuses} sizes={sizes}>
      {colors.map((color) => (
        <NextUISlider
          key={color}
          aria-label="Temperature"
          className="max-w-md"
          color={color === "default" ? "foreground" : color}
          defaultValue={0.7}
          maxValue={1}
          minValue={0}
          step={0.01}
        />
      ))}
    </ShowcaseComponent>
  );
}

const colors: NextUIColor[] = ["default", "primary", "secondary", "success", "warning", "danger"];
const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
