import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const autocomplete = tv({
  slots: {
    base: "inline-flex flex-column",
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popoverContent: "w-full p-1 overflow-hidden",
    endContentWrapper: "relative flex",
    clearButton: [
      "opacity-0",
      "text-medium",
      "translate-x-1",
      "text-default-500",
      "cursor-text",
      "data-[visible=true]:opacity-100", // on mobile is always visible when there is a value
      "group-data-[hover=true]:data-[visible=true]:md:opacity-100",
      "group-data-[hover=true]:data-[visible=true]:md:cursor-pointer",
    ],
    selectorButton: "text-medium",
  },
  variants: {
    disableAnimation: {
      true: {},
      false: {
        selectorButton: "transition-transform duration-150 ease motion-reduce:transition-none",
      },
    },
    disableSelectorIconRotation: {
      true: {},
      false: {
        selectorButton: "data-[open=true]:rotate-180",
      },
    },
  },
  defaultVariants: {
    disableAnimation: false,
    disableSelectorIconRotation: false,
  },
});

export type AutocompleteVariantProps = VariantProps<typeof autocomplete>;
export type AutocompleteSlots = keyof ReturnType<typeof autocomplete>;

export {autocomplete};
