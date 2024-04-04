import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * DateFIeld wrapper **Tailwind Variants** component
 *
 * @example
 */
const dateField = tv({
  slots: {
    base: "group flex flex-col",
    label: ["block", "subpixel-antialiased", "text-small", "text-default-600"],
    mainWrapper: "h-full",
    fieldWrapper:
      "relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3",
    innerWrapper: "inline-flex w-full items-center h-full box-border",
    field: [
      "flex w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none",
      "data-[has-start-content=true]:ps-1.5",
      "data-[has-end-content=true]:pe-1.5",
    ],
    helperWrapper: "hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    variant: {
      flat: {
        fieldWrapper: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100",
        ],
      },
      faded: {
        fieldWrapper: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
        ],
        value: "group-data-[has-value=true]:text-default-foreground",
      },
      bordered: {
        fieldWrapper: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "group-data-[focus=true]:border-default-foreground",
        ],
      },
      underlined: {
        fieldWrapper: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "group-data-[focus=true]:after:w-full",
        ],
        innerWrapper: "pb-1",
        label: "group-data-[filled-within=true]:text-foreground",
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {
        label: "text-tiny",
        field: "text-small",
        fieldWrapper: "h-unit-8 min-h-unit-8 px-2 rounded-small",
      },
      md: {
        field: "text-small",
        fieldWrapper: "h-unit-10 min-h-unit-10 rounded-medium",
        clearButton: "text-large",
      },
      lg: {
        field: "text-medium",
        fieldWrapper: "h-unit-12 min-h-unit-12 rounded-large",
      },
    },
    radius: {
      none: {
        fieldWrapper: "rounded-none",
      },
      sm: {
        fieldWrapper: "rounded-small",
      },
      md: {
        fieldWrapper: "rounded-medium",
      },
      lg: {
        fieldWrapper: "rounded-large",
      },
      full: {
        fieldWrapper: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        mainWrapper: "flex flex-col gap-y-1.5",
        label: "text-foreground",
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap data-[has-helper=true]:items-start",
        fieldWrapper: "flex-1",
        mainWrapper: "flex flex-col",
        label: "relative text-foreground pr-2 rtl:pr-0 rtl:pl-2",
      },
      inside: {
        label: "text-tiny cursor-text",
        fieldWrapper: "flex-col items-start justify-center gap-0",
        innerWrapper: "group-data-[has-label=true]:items-end",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        fieldWrapper: "pointer-events-none",
        label: "pointer-events-none",
      },
    },
    disableAnimation: {
      true: {
        label: "transition-none",
        field: "transition-none",
        fieldWrapper: "transition-none",
      },
      false: {
        label: [
          "will-change-auto",
          "!duration-200",
          "!ease-out",
          "motion-reduce:transition-none",
          "transition-[transform,color,left,opacity]",
        ],
        fieldWrapper: "transition-background motion-reduce:transition-none !duration-150",
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    fullWidth: true,
    labelPlacement: "inside",
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        fieldWrapper: "h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        fieldWrapper: "h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-small",
        fieldWrapper: "h-16 py-2.5 gap-0",
      },
    },
  ],
});

export type DateFieldVariantProps = VariantProps<typeof dateField>;
export type DateFieldSlots = keyof ReturnType<typeof dateField>;

export {dateField};
