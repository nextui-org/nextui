import {CircularProgress as NextUICircularProgress} from "@nextui-org/react";

import {NextUISize} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function CircularProgress() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="CircularProgress" sizes={sizes}>
      <NextUICircularProgress color="default">Default</NextUICircularProgress>
      <NextUICircularProgress color="primary">Primary</NextUICircularProgress>
      <NextUICircularProgress color="secondary">Secondary</NextUICircularProgress>
      <NextUICircularProgress color="success">Success</NextUICircularProgress>
      <NextUICircularProgress color="warning">Warning</NextUICircularProgress>
      <NextUICircularProgress color="danger">Danger</NextUICircularProgress>
    </ShowcaseComponent>
  );
}

const sizes: NextUISize[] = ["sm", "md", "lg"];
