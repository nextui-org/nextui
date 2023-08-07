import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const select = tv({
  slots: {
    base: "inline-flex flex-col relative w-52 gap-2",
    label: "block text-sm font-medium text-default-300 text-left cursor-default",
    trigger:
      "px-3 py-2 relative inline-flex flex-row items-center justify-between rounded-md overflow-hidden cursor-default shadow-sm border-2 outline-none",
    value: "text-default-300",
    icon: "w-4 h-4 data-[open=true]:rotate-180 transition-transform duration-150 ease-in-out",
    menu: "",
    popover: "w-full p-1 w-52 min-w-[200px]",
  },
  variants: {},
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export {select};
