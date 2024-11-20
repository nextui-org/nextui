import {Avatar as NextUIAvatar, Badge as NextUIBadge} from "@nextui-org/react";

import {NextUISize, NextUIVariant} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Badge() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Badge" sizes={sizes} variants={variants}>
      <NextUIBadge color="default" content="3">
        <NextUIAvatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </NextUIBadge>
      <NextUIBadge color="primary" content="3">
        <NextUIAvatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </NextUIBadge>
      <NextUIBadge color="secondary" content="3">
        <NextUIAvatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </NextUIBadge>
      <NextUIBadge color="success" content="3">
        <NextUIAvatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </NextUIBadge>
      <NextUIBadge color="warning" content="3">
        <NextUIAvatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </NextUIBadge>
      <NextUIBadge color="danger" content="3">
        <NextUIAvatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </NextUIBadge>
    </ShowcaseComponent>
  );
}

const sizes: NextUISize[] = ["sm", "md", "lg"];
const variants: NextUIVariant[] = ["solid", "faded", "flat", "shadow"];
