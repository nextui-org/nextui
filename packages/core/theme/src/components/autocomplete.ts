import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const autocomplete = tv({
  slots: {
    base: "group inline-flex flex-column w-full",
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popoverContent: "w-full p-1 overflow-hidden",
    endContentWrapper: "relative flex h-full items-center -mr-2",
    clearButton: [
      "text-medium",
      "translate-x-1",
      "cursor-text",
      "opacity-0",
      "text-default-500",
      "group-data-[invalid=true]:text-danger",
      "data-[visible=true]:opacity-100", // on mobile is always visible when there is a value
      "data-[visible=true]:cursor-pointer",
      "sm:data-[visible=true]:opacity-0", // only visible on hover
      "sm:group-data-[hover=true]:data-[visible=true]:opacity-100",
    ],
    selectorButton: "text-medium",
  },
  variants: {
    isClearable: {
      true: {},
      false: {
        clearButton: "hidden",
      },
    },
    disableAnimation: {
      true: {
        selectorButton: "transition-none",
      },
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
    isClearable: true,
    disableSelectorIconRotation: false,
  },
});

export type AutocompleteVariantProps = VariantProps<typeof autocomplete>;
export type AutocompleteSlots = keyof ReturnType<typeof autocomplete>;

export {autocomplete};
