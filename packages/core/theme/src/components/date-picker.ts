import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * DatePicker wrapper **Tailwind Variants** component
 *
 * @example
 */
const datePicker = tv({
  slots: {
    base: "group w-full",
    selectorButton: "-mr-2 text-inherit",
    selectorIcon: "text-lg text-inherit pointer-events-none flex-shrink-0",
    popoverContent: "p-0 w-full",
    calendar: "w-[var(--calendar-width)] shadow-none",
    calendarContent: "w-[var(--calendar-width)]",
    timeInputLabel: "font-medium",
    timeInput: "px-5 pb-4 flex-wrap gap-x-6",
  },
  variants: {
    // @internal
    hasMultipleMonths: {
      true: {
        calendar: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
        calendarContent: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
      },
      false: {},
    },
  },
  defaultVariants: {
    hasMultipleMonths: false,
  },
});

export type DatePickerReturnType = ReturnType<typeof datePicker>;
export type DatePickerVariantProps = VariantProps<typeof datePicker>;
export type DatePickerSlots = keyof ReturnType<typeof datePicker>;

export {datePicker};
