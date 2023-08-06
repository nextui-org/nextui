import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const select = tv({
  slots: {
    base: "inline-flex flex-col relative w-52 gap-2",
    label: "block text-sm font-medium text-default-300 text-left cursor-default",
    trigger:
      "p-1 pl-3 py-1 relative inline-flex flex-row items-center justify-between rounded-md overflow-hidden cursor-default shadow-sm border-2 outline-none",
    value: "text-default-300",
    icon: "w-5 h-5",
    menu: "",
    popover: "",
  },
  variants: {},
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export {select};
