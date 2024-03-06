import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const calendar = tv({
  slots: {
    base: [],
    prevButton: [],
    nextButton: [],
    grid: [],
    gridHeader: [],
    gridHeaderCell: [],
    gridBody: [],
    cell: [],
    errorMessage: [],
  },
  variants: {},
  defaultVariants: {},
});

export type CalendarVariantProps = VariantProps<typeof calendar>;
export type CalendarSlots = keyof ReturnType<typeof calendar>;

export {calendar};
