import {Tab, Tabs as NextUITabs} from "@nextui-org/react";

import {ShowcaseComponent} from "../showcase-component";
import {NextUIColor, NextUIRadius, NextUISize, NextUIVariant} from "../../types";

export function Tabs() {
  return (
    <ShowcaseComponent
      defaultVariant="solid"
      name="Tabs"
      radiuses={radiuses}
      sizes={sizes}
      variants={variants}
    >
      {colors.map((color) => (
        <NextUITabs key={color} aria-label="Tabs colors" color={color} radius="full">
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </NextUITabs>
      ))}
    </ShowcaseComponent>
  );
}

const colors: NextUIColor[] = ["default", "primary", "secondary", "success", "warning", "danger"];
const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
const variants: NextUIVariant[] = ["solid", "bordered", "light", "underlined"];
