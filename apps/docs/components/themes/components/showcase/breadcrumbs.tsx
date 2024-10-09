import {BreadcrumbItem, Breadcrumbs as NextUIBreadcrumbs} from "@nextui-org/react";

import {NextUIColor, NextUIRadius, NextUISize, NextUIVariant} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Breadcrumbs() {
  const colors: NextUIColor[] = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <ShowcaseComponent
      defaultVariant="solid"
      name="Breadcrumbs"
      radiuses={radiuses}
      sizes={sizes}
      variants={variants}
    >
      {colors.map((color) => (
        <NextUIBreadcrumbs key={color} color={color === "default" ? "foreground" : color}>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Music</BreadcrumbItem>
          <BreadcrumbItem>Artist</BreadcrumbItem>
          <BreadcrumbItem>Album</BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </NextUIBreadcrumbs>
      ))}
    </ShowcaseComponent>
  );
}

const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
const variants: NextUIVariant[] = ["solid", "bordered", "light"];
