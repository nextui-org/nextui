import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const select = tv({
  base: ["w-full", "p-1", "min-w-[200px]"],
  variants: {
    color: {},
  },
});

export type SelectVariantProps = VariantProps<typeof select>;

export {select};
