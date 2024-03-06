import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const calendar = tv({
  slots: {
    base: "max-w-full w-fit shadow-small rounded-large overflow-hidden bg-default-50 dark:bg-background",
    prevButton: [],
    nextButton: [],
    headerWrapper: "px-4 py-2 flex items-center justify-between gap-4 bg-content1",
    header: "flex w-full items-center justify-between gap-2",
    title: "text-default-500 text-small font-medium",
    gridWrapper: "flex pb-3 gap-4",
    grid: [],
    gridHeader: "bg-content1 shadow-[0px_10px_20px_0px_rgb(0_0_0/0.05)]",
    gridHeaderRow: "text-default-400",
    gridHeaderCell: "font-medium text-small pb-2 first:ps-4 last:pe-4",
    gridBody: "",
    gridBodyRow: "[&>td]:first:pt-2",
    cell: "first:ps-4 last:pe-4",
    cellButton: [
      "w-8 h-8 flex items-center text-foreground justify-center rounded-full",
      "box-border appearance-none select-none whitespace-nowrap font-normal",
      "subpixel-antialiased overflow-hidden tap-highlight-transparent",
      "origin-center transition-[transform,background-color]",
      "data-[hover=true]:bg-default-200",
      "data-[pressed=true]:scale-95",
      "data-[disabled=true]:text-default-300",
      ...dataFocusVisibleClasses,
    ],
    errorMessage: [],
  },
  variants: {
    color: {
      default: "",
      primary: {
        cellButton: "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
      },
      secondary: "",
      success: "",
      warning: "",
      danger: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
  compoundSlots: [
    {
      slots: ["prevButton", "nextButton"],
      class: ["text-medium", "text-default-400"],
    },
  ],
});

export type CalendarReturnType = ReturnType<typeof calendar>;
export type CalendarVariantProps = VariantProps<typeof calendar>;
export type CalendarSlots = keyof ReturnType<typeof calendar>;

export {calendar};
