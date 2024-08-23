import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const alert = tv({
  slots: {
    base: [],
  },
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
