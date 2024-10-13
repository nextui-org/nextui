import {Code as NextUICode} from "@nextui-org/react";

import {NextUIRadius, NextUISize} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Code() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Code" radiuses={radiuses} sizes={sizes}>
      <NextUICode color="default">npm install @nextui-org/react</NextUICode>
      <NextUICode color="primary">npm install @nextui-org/react</NextUICode>
      <NextUICode color="secondary">npm install @nextui-org/react</NextUICode>
      <NextUICode color="success">npm install @nextui-org/react</NextUICode>
      <NextUICode color="warning">npm install @nextui-org/react</NextUICode>
      <NextUICode color="danger">npm install @nextui-org/react</NextUICode>
    </ShowcaseComponent>
  );
}

const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
