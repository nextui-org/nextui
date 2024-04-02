import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const calendar = tv({
  slots: {
    base: [
      "relative w-fit max-w-full shadow-small inline-block",
      "rounded-large overflow-scroll bg-default-50 dark:bg-background",
    ],
    prevButton: [],
    nextButton: [],
    headerWrapper: [
      "px-4 py-2 flex items-center justify-between gap-2 bg-content1",
      // month/year picker wrapper
      "after:content-['']",
      "after:bg-content1 origin-top",
      "after:w-full after:h-0",
      "after:absolute after:top-0 after:left-0",
    ],
    header: "flex w-full items-center justify-center gap-2 z-10",
    title: "text-default-500 text-small font-medium",
    gridWrapper: "flex max-w-full overflow-auto pb-2 h-auto relative",
    grid: "",
    gridHeader: "bg-content1 shadow-[0px_20px_20px_0px_rgb(0_0_0/0.05)]",
    gridHeaderRow: "text-default-400",
    gridHeaderCell: "font-medium text-small pb-2 first:ps-4 last:pe-4",
    gridBody: "",
    gridBodyRow: "[&>td]:first:pt-2",
    cell: "py-0.5 first:ps-4 last:pe-4 [&:not(:first-child):not(:last-child)]:px-0.5",
    cellButton: [
      "w-8 h-8 flex items-center text-foreground justify-center rounded-full",
      "box-border appearance-none select-none whitespace-nowrap font-normal",
      "subpixel-antialiased overflow-hidden tap-highlight-transparent",
      "data-[disabled=true]:text-default-300",
      "data-[disabled=true]:cursor-default",
      "data-[readonly=true]:cursor-default",
      "data-[disabled=true]:transition-none",
      "data-[unavailable=true]:text-default-300",
      "data-[unavailable=true]:cursor-default",
      "data-[unavailable=true]:line-through",
      ...dataFocusVisibleClasses,
    ],
    pickerWrapper:
      "absolute inset-x-0 top-0 flex w-full h-[var(--picker-height)] justify-center opacity-0 pointer-events-none",
    pickerMonthList: "items-start",
    pickerYearList: "items-center",
    pickerHighlight:
      "h-8 bg-default-200 absolute w-[calc(100%_-_16px)] rounded-medium z-0 top-1/2 -translate-y-1/2 pointer-events-none",
    pickerItem: [
      "w-full flex text-foreground items-center h-8 leading-[32px] min-h-[32px] snap-center text-large z-20",
      "data-[pressed=true]:opacity-50",
      ...dataFocusVisibleClasses,
    ],
    helperWrapper: "px-4 pb-2 max-w-[270px] flex justify-start flex-wrap items-center",
    errorMessage: "text-small text-danger break-words max-w-full",
  },
  variants: {
    color: {
      foreground: {
        cellButton: [
          "data-[hover=true]:bg-default-200",
          "data-[selected=true]:shadow-md",
          "data-[selected=true]:shadow-foreground/40",
          "data-[selected=true]:bg-foreground",
          "data-[selected=true]:text-background",
          "data-[hover=true]:bg-foreground-200",
          "data-[hover=true]:text-foreground-600",
          "data-[selected=true]:data-[hover=true]:bg-foreground",
          "data-[selected=true]:data-[hover=true]:text-background",
        ],
      },
      primary: {
        cellButton: [
          "data-[selected=true]:shadow-md",
          "data-[selected=true]:shadow-primary/40",
          "data-[selected=true]:bg-primary",
          "data-[selected=true]:text-primary-foreground",
          "data-[hover=true]:bg-primary-50",
          "data-[hover=true]:text-primary-400",
          "data-[selected=true]:data-[hover=true]:bg-primary",
          "data-[selected=true]:data-[hover=true]:text-primary-foreground",
        ],
      },
      secondary: {
        cellButton: [
          "data-[selected=true]:shadow-md",
          "data-[selected=true]:shadow-secondary/40",
          "data-[selected=true]:bg-secondary",
          "data-[selected=true]:text-secondary-foreground",
          "data-[hover=true]:bg-secondary-50",
          "data-[hover=true]:text-secondary-400",
          "data-[selected=true]:data-[hover=true]:bg-secondary",
          "data-[selected=true]:data-[hover=true]:text-secondary-foreground",
        ],
      },
      success: {
        cellButton: [
          "data-[selected=true]:shadow-md",
          "data-[selected=true]:shadow-success/40",
          "data-[selected=true]:bg-success",
          "data-[selected=true]:text-success-foreground",
          "data-[hover=true]:bg-success-100",
          "data-[hover=true]:text-success-600",
          "dark:data-[hover=true]:bg-success-50",
          "dark:data-[hover=true]:text-success-500",
          "data-[selected=true]:data-[hover=true]:bg-success",
          "dark:data-[selected=true]:data-[hover=true]:bg-success",
          "dark:data-[selected=true]:data-[hover=true]:text-success-foreground",
          "data-[selected=true]:data-[hover=true]:text-success-foreground",
        ],
      },
      warning: {
        cellButton: [
          "data-[selected=true]:shadow-md",
          "data-[selected=true]:shadow-warning/40",
          "data-[selected=true]:bg-warning",
          "data-[selected=true]:text-warning-foreground",
          "data-[hover=true]:bg-warning-100",
          "data-[hover=true]:text-warning-600",
          "dark:data-[hover=true]:bg-warning-50",
          "dark:data-[hover=true]:text-warning-500",
          "data-[selected=true]:data-[hover=true]:bg-warning",
          "dark:data-[selected=true]:data-[hover=true]:bg-warning",
          "dark:data-[selected=true]:data-[hover=true]:text-warning-foreground",
          "data-[selected=true]:data-[hover=true]:text-warning-foreground",
        ],
      },
      danger: {
        cellButton: [
          "data-[selected=true]:shadow-md",
          "data-[selected=true]:shadow-danger/40",
          "data-[selected=true]:bg-danger",
          "data-[selected=true]:text-danger-foreground",
          "data-[hover=true]:bg-danger-100",
          "data-[hover=true]:text-danger-500",
          "dark:data-[hover=true]:bg-danger-50",
          "dark:data-[hover=true]:text-danger-500",
          "data-[selected=true]:data-[hover=true]:bg-danger",
          "dark:data-[selected=true]:data-[hover=true]:bg-danger",
          "dark:data-[selected=true]:data-[hover=true]:text-danger-foreground",
          "data-[selected=true]:data-[hover=true]:text-danger-foreground",
        ],
      },
    },
    isHeaderWrapperExpanded: {
      true: {
        headerWrapper: ["[&_.chevron-icon]:rotate-180", "after:h-full", "after:z-0"],
        pickerWrapper: "opacity-100 pointer-events-auto z-10",
        gridWrapper: "h-[var(--picker-height)] overflow-y-hidden",
        grid: "opacity-0 pointer-events-none",
        nextButton: "opacity-0 pointer-events-none",
        prevButton: "opacity-0 pointer-events-none",
      },
      false: {},
    },
    showMonthAndYearPickers: {
      true: {
        base: "[--picker-height:224px]",
        header: "h-8 bg-default-100 rounded-full",
      },
      false: {},
    },
    showShadow: {
      true: "",
      false: {
        cellButton: "shadow-none data-[selected=true]:shadow-none",
      },
    },
    disableAnimation: {
      true: {
        cellButton: "transition-none",
      },
      false: {
        headerWrapper: ["[&_.chevron-icon]:transition-transform", "after:transition-height"],
        grid: "transition-opacity",
        cellButton: [
          "data-[pressed=true]:scale-95",
          "origin-center transition-[transform,background-color,color] !duration-200",
        ],
        pickerWrapper: "transition-opacity !duration-300",
        pickerItem: "transition-opacity",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    showShadow: false,
    showMonthAndYearPickers: false,
    disableAnimation: false,
  },
  compoundSlots: [
    {
      slots: ["prevButton", "nextButton"],
      class: ["text-medium", "text-default-400"],
    },
    {
      slots: ["pickerMonthList", "pickerYearList"],
      class: [
        // styles
        "flex flex-col px-4 overflow-y-scroll scrollbar-hide snap-y snap-mandatory",
        // scroll shadow
        "[--scroll-shadow-size:100px]",
        "[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
      ],
    },
  ],
});

export type CalendarReturnType = ReturnType<typeof calendar>;
export type CalendarVariantProps = VariantProps<typeof calendar>;
export type CalendarSlots = keyof ReturnType<typeof calendar>;

export {calendar};
