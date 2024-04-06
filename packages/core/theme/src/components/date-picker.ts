import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * DatePicker wrapper **Tailwind Variants** component
 *
 * @example
 */
const datePicker = tv({
  slots: {
    base: "w-full",
    selectorButton: "-mr-2 text-inherit",
    selectorIcon: "text-lg text-inherit pointer-events-none flex-shrink-0",
    popoverContent: "p-0 w-full",
    calendar: "w-64 shadow-none",
  },
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export type DatePickerReturnType = ReturnType<typeof datePicker>;
export type DatePickerVariantProps = VariantProps<typeof datePicker>;
export type DatePickerSlots = keyof ReturnType<typeof datePicker>;

export {datePicker};
