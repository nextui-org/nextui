import {Avatar as NextUIAvatar} from "@nextui-org/react";

import {NextUIRadius, NextUISize} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Avatar() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Avatar" radiuses={radiuses} sizes={sizes}>
      <NextUIAvatar
        isBordered
        color="default"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      >
        Default
      </NextUIAvatar>
      <NextUIAvatar
        isBordered
        color="primary"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      >
        Primary
      </NextUIAvatar>
      <NextUIAvatar
        isBordered
        color="secondary"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      >
        Secondary
      </NextUIAvatar>
      <NextUIAvatar
        isBordered
        color="success"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      >
        Success
      </NextUIAvatar>
      <NextUIAvatar
        isBordered
        color="warning"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      >
        Warning
      </NextUIAvatar>
      <NextUIAvatar isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c">
        Danger
      </NextUIAvatar>
    </ShowcaseComponent>
  );
}

const radiuses: NextUIRadius[] = ["sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];
