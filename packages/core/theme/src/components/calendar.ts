import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const calendar = tv({
  slots: {
    base: [
      "relative w-fit max-w-full shadow-small inline-block overflow-y-hidden",
      "rounded-large overflow-x-auto bg-default-50 dark:bg-background",
      "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    ],
    prevButton: ["order-1"],
    nextButton: ["order-3"],
    headerWrapper: [
      "px-4 py-2 flex items-center justify-between gap-2 bg-content1 overflow-hidden rtl:flex-row-reverse",
      "[&_.chevron-icon]:flex-none",
      // month/year picker wrapper
      "after:content-['']",
      "after:bg-content1 origin-top",
      "after:w-full after:h-0",
      "after:absolute after:top-0 after:left-0",
    ],
    header: "flex w-full items-center justify-center gap-2 z-10 order-2",
    title: "text-default-500 text-small font-medium",
    content: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    gridWrapper: "flex max-w-full overflow-hidden pb-2 h-auto relative",
    grid: "w-full border-collapse z-0",
    gridHeader: "bg-content1 shadow-[0px_20px_20px_0px_rgb(0_0_0/0.05)]",
    gridHeaderRow: "px-4 pb-2 flex justify-center text-default-400",
    gridHeaderCell: "flex w-full justify-center items-center font-medium text-small",
    gridBody: "w-full h-full",
    gridBodyRow: "flex h-full px-4 justify-start items-start first:mt-2",
    cell: "py-0.5 px-0 w-full h-full",
    cellButton: ["relative w-full h-full justify-start", ...dataFocusVisibleClasses],
    cellContent: "flex flex-col w-full gap-0.5 justify-start items-center ",
    cellHeaderWrapper: ["flex w-full h-full justify-center items-center"],
    cellHeader: [
      "w-8 h-8 flex items-center text-foreground justify-center rounded-full shrink-0",
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
    cellBody: "w-full h-full",
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
      foreground: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    // @internal
    isRange: {
      true: {
        cellHeaderWrapper: [
          // base
          "relative",
          "overflow-visible",

          // before pseudo element
          "before:content-[''] before:absolute before:inset-0 before:z-[-1] before:rounded-none",
          "after:content-[''] after:absolute after:inset-0 after:z-[-1] after:rounded-none",

          // hide before pseudo element when the selected cell is outside the month
          "data-[outside-month=true]:before:hidden",
          "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:bg-transparent",
          "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-default-300",
          "data-[outside-month=true]:after:hidden",
          "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:bg-transparent",
          "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-default-300",

          // middle
          // "data-[selected=true]:data-[range-selection=true]:bg-transparent",

          // start (pseudo)
          "data-[range-start=true]:before:rounded-l-full",
          "data-[selection-start=true]:before:rounded-l-full",
          "data-[range-start=true]:before:w-8",
          "data-[selection-start=true]:before:w-8",
          "data-[range-start=true]:before:justify-self-center",
          "data-[selection-start=true]:before:justify-self-center",
          "data-[range-start=true]:after:w-1/2",
          "data-[selection-start=true]:after:w-1/2",
          "data-[range-start=true]:after:justify-self-end",
          "data-[selection-start=true]:after:justify-self-end",

          // end (pseudo)
          "data-[range-end=true]:before:rounded-r-full",
          "data-[selection-end=true]:before:rounded-r-full",
          "data-[range-end=true]:before:w-8",
          "data-[selection-end=true]:before:w-8",
          "data-[range-end=true]:before:justify-self-center",
          "data-[selection-end=true]:before:justify-self-center",
          "data-[range-end=true]:after:w-1/2",
          "data-[selection-end=true]:after:w-1/2",
          "data-[range-end=true]:after:justify-self-start",
          "data-[selection-end=true]:after:justify-self-start",

          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-full",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-full",
        ],
      },
      false: {},
    },
    hideDisabledDates: {
      true: {
        cellHeader: "data-[disabled=true]:data-[outside-month=true]:opacity-0",
      },
      false: {},
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
      true: {
        cellHeader: "data-[selected=true]:shadow-md",
      },
      false: {
        cellHeader: "shadow-none data-[selected=true]:shadow-none",
      },
    },
    disableAnimation: {
      true: {
        cellHeader: "transition-none",
      },
      false: {
        headerWrapper: ["[&_.chevron-icon]:transition-transform", "after:transition-height"],
        grid: "transition-opacity",
        cellHeader: ["origin-center transition-[transform,background-color,color] !duration-150"],
        pickerWrapper: "transition-opacity !duration-250",
        pickerItem: "transition-opacity",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    showShadow: false,
    hideDisabledDates: false,
    showMonthAndYearPickers: false,
  },
  compoundVariants: [
    // !isRange & colors --> Calendar
    {
      isRange: false,
      color: "foreground",
      class: {
        cellHeader: [
          "data-[hover=true]:bg-default-200",
          "data-[selected=true]:bg-foreground",
          "data-[selected=true]:text-background",
          "data-[hover=true]:bg-foreground-200",
          "data-[hover=true]:text-foreground-600",
          "data-[selected=true]:data-[hover=true]:bg-foreground",
          "data-[selected=true]:data-[hover=true]:text-background",
        ],
      },
    },
    {
      isRange: false,
      color: "primary",
      class: {
        cellHeader: [
          "data-[selected=true]:bg-primary",
          "data-[selected=true]:text-primary-foreground",
          "data-[hover=true]:bg-primary-50",
          "data-[hover=true]:text-primary-400",
          "data-[selected=true]:data-[hover=true]:bg-primary",
          "data-[selected=true]:data-[hover=true]:text-primary-foreground",
        ],
      },
    },
    {
      isRange: false,
      color: "secondary",
      class: {
        cellHeader: [
          "data-[selected=true]:bg-secondary",
          "data-[selected=true]:text-secondary-foreground",
          "data-[hover=true]:bg-secondary-50",
          "data-[hover=true]:text-secondary-400",
          "data-[selected=true]:data-[hover=true]:bg-secondary",
          "data-[selected=true]:data-[hover=true]:text-secondary-foreground",
        ],
      },
    },
    {
      isRange: false,
      color: "success",
      class: {
        cellHeader: [
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
    },
    {
      isRange: false,
      color: "warning",
      class: {
        cellHeader: [
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
    },
    {
      isRange: false,
      color: "danger",
      class: {
        cellHeader: [
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
    // isRange & colors --> RangeCalendar
    {
      isRange: true,
      color: "foreground",
      class: {
        cellHeaderWrapper: [
          // middle
          "data-[selected=true]:data-[range-selection=true]:before:bg-foreground/10",
          "data-[selected=true]:data-[range-selection=true]:text-foreground",
          "data-[selected=true]:data-[range-selection=true]:after:bg-foreground/10",
        ],
        cellHeader: [
          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-foreground",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-background",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-foreground",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-background",
        ],
      },
    },
    {
      isRange: true,
      color: "primary",
      class: {
        cellHeaderWrapper: [
          // middle
          "data-[selected=true]:data-[range-selection=true]:before:bg-primary-50",
          "data-[selected=true]:data-[range-selection=true]:text-primary",
          "data-[selected=true]:data-[range-selection=true]:after:bg-primary-50",
        ],
        cellHeader: [
          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-primary",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-primary-foreground",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-primary",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-primary-foreground",
        ],
      },
    },
    {
      isRange: true,
      color: "secondary",
      class: {
        cellHeaderWrapper: [
          // middle
          "data-[selected=true]:data-[range-selection=true]:before:bg-secondary-50",
          "data-[selected=true]:data-[range-selection=true]:text-secondary",
          "data-[selected=true]:data-[range-selection=true]:after:bg-secondary-50",
        ],
        cellHeader: [
          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-secondary",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-secondary-foreground",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-secondary",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-secondary-foreground",
        ],
      },
    },
    {
      isRange: true,
      color: "success",
      class: {
        cellHeaderWrapper: [
          // middle
          "data-[selected=true]:data-[range-selection=true]:before:bg-success-100",
          "data-[selected=true]:data-[range-selection=true]:text-success-600",
          "dark:data-[selected=true]:data-[range-selection=true]:before:bg-success-50",
          "dark:data-[selected=true]:data-[range-selection=true]:text-success-500",
          "data-[selected=true]:data-[range-selection=true]:after:bg-success-100",
          "dark:data-[selected=true]:data-[range-selection=true]:after:bg-success-50",
        ],
        cellHeader: [
          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-success",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-success-foreground",
          "dark:data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-success-foreground",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-success",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-success-foreground",
          "dark:data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-success-foreground",
        ],
      },
    },
    {
      isRange: true,
      color: "warning",
      class: {
        cellHeaderWrapper: [
          // middle
          "data-[selected=true]:data-[range-selection=true]:before:bg-warning-100",
          "dark:data-[selected=true]:data-[range-selection=true]:before:bg-warning-50",
          "data-[selected=true]:data-[range-selection=true]:text-warning-500",
          "data-[selected=true]:data-[range-selection=true]:after:bg-warning-100",
          "dark:data-[selected=true]:data-[range-selection=true]:after:bg-warning-50",
        ],
        cellHeader: [
          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-warning",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-warning-foreground",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-warning",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-warning-foreground",
        ],
      },
    },
    {
      isRange: true,
      color: "danger",
      class: {
        cellHeaderWrapper: [
          // middle
          "data-[selected=true]:data-[range-selection=true]:before:bg-danger-50",
          "data-[selected=true]:data-[range-selection=true]:text-danger-500",
          "data-[selected=true]:data-[range-selection=true]:after:bg-danger-50",
        ],
        cellHeader: [
          // start (selected)
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-danger",
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-danger-foreground",

          // end (selected)
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-danger",
          "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-danger-foreground",
        ],
      },
    },
    // showShadow & colors
    {
      showShadow: true,
      color: "foreground",
      class: {
        cellHeader: "data-[selected=true]:shadow-foreground/40",
      },
    },
    {
      showShadow: true,
      color: "primary",
      class: {
        cellHeader: "data-[selected=true]:shadow-primary/40",
      },
    },
    {
      showShadow: true,
      color: "secondary",
      class: {
        cellHeader: "data-[selected=true]:shadow-secondary/40",
      },
    },
    {
      showShadow: true,
      color: "success",
      class: {
        cellHeader: "data-[selected=true]:shadow-success/40",
      },
    },
    {
      showShadow: true,
      color: "warning",
      class: {
        cellHeader: "data-[selected=true]:shadow-warning/40",
      },
    },
    {
      showShadow: true,
      color: "danger",
      class: {
        cellHeader: "data-[selected=true]:shadow-danger/40",
      },
    },
    // showShadow & isRange
    {
      showShadow: true,
      isRange: true,
      class: {
        cellHeader: [
          // remove shadow from middle
          "data-[selected=true]:shadow-none",
          // add shadow to start (selected)
          "data-[selected=true]:data-[selection-start=true]:shadow-md",
          // add shadow to end (selected)
          "data-[selected=true]:data-[selection-end=true]:shadow-md",
        ],
      },
    },
  ],
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
