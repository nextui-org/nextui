import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const autocomplete = tv({
  slots: {
    base: "inline-flex flex-column",
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popoverContent: "w-full p-1 overflow-hidden",
    endContentWrapper: "flex",
    clearButton: [
      "text-medium",
      "translate-x-1",
      "text-default-500",
      "group-data-[hover=true]:data-[visible=true]:opacity-100 opacity-0",
    ],
    selectorButton: "text-medium",
  },
  variants: {},
});

export type AutocompleteVariantProps = VariantProps<typeof autocomplete>;
export type AutocompleteSlots = keyof ReturnType<typeof autocomplete>;

export {autocomplete};
