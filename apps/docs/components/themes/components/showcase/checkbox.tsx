import {Checkbox as NextUICheckbox} from "@nextui-org/react";

import {NextUIRadius, NextUISize} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Checkbox() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Checkbox" radiuses={radiuses} sizes={sizes}>
      <NextUICheckbox defaultSelected color="default">
        Default
      </NextUICheckbox>
      <NextUICheckbox defaultSelected color="primary">
        Primary
      </NextUICheckbox>
      <NextUICheckbox defaultSelected color="secondary">
        Secondary
      </NextUICheckbox>
      <NextUICheckbox defaultSelected color="success">
        Success
      </NextUICheckbox>
      <NextUICheckbox defaultSelected color="warning">
        Warning
      </NextUICheckbox>
      <NextUICheckbox defaultSelected color="danger">
        Danger
      </NextUICheckbox>
    </ShowcaseComponent>
  );
}

const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
