import {Pagination as NextUIPagination} from "@nextui-org/react";

import {ShowcaseComponent} from "../showcase-component";
import {NextUIRadius, NextUISize, NextUIVariant} from "../../types";

export function Pagination() {
  return (
    <ShowcaseComponent
      defaultVariant="light"
      name="Pagination"
      radiuses={radiuses}
      sizes={sizes}
      variants={variants}
    >
      <NextUIPagination color="default" page={1} total={10}>
        Default
      </NextUIPagination>
      <NextUIPagination color="primary" page={1} total={10}>
        Primary
      </NextUIPagination>
      <NextUIPagination color="secondary" page={1} total={10}>
        Secondary
      </NextUIPagination>
      <NextUIPagination color="success" page={1} total={10}>
        Success
      </NextUIPagination>
      <NextUIPagination color="warning" page={1} total={10}>
        Warning
      </NextUIPagination>
      <NextUIPagination color="danger" page={1} total={10}>
        Danger
      </NextUIPagination>
    </ShowcaseComponent>
  );
}

const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
const variants: NextUIVariant[] = ["faded", "bordered", "light", "flat"];
