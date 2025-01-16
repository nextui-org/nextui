import {Chip as NextUIChip} from "@nextui-org/react";

import {NextUISize, NextUIVariant} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Chip() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Chip" sizes={sizes} variants={variants}>
      <NextUIChip color="default">Default</NextUIChip>
      <NextUIChip color="primary">Primary</NextUIChip>
      <NextUIChip color="secondary">Secondary</NextUIChip>
      <NextUIChip color="success">Success</NextUIChip>
      <NextUIChip color="warning">Warning</NextUIChip>
      <NextUIChip color="danger">Danger</NextUIChip>
    </ShowcaseComponent>
  );
}

const sizes: NextUISize[] = ["sm", "md", "lg"];
const variants: NextUIVariant[] = ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"];
