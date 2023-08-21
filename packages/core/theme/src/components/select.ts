import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const select = tv({
  slots: {
    base: "group inline-flex flex-col relative w-full",
    label: "block text-small font-medium text-foreground-500",
    trigger:
      "relative px-3 gap-3 w-full inline-flex flex-row items-center shadow-sm outline-none tap-highlight-transparent",
    innerWrapper:
      "inline-flex h-full w-[calc(100%_-_theme(spacing.unit-6))] items-center gap-1.5 box-border",
    selectorIcon: "absolute right-3 w-unit-4 h-unit-4",
    spinner: "absolute right-3",
    value: "font-normal w-full text-left opacity-60 group-data-[filled=true]:opacity-100",
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popover: "w-full p-1 overflow-hidden",
    helperWrapper: "flex relative flex-col gap-1.5 pt-1 px-1",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    variant: {
      flat: {
        trigger: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100",
        ],
      },
      faded: {
        trigger: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
        ],
      },
      bordered: {
        trigger: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "data-[open=true]:border-foreground",
          "data-[focus=true]:border-foreground",
        ],
      },
      underlined: {
        trigger: [
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
          "after:bg-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "data-[open=true]:after:w-full",
          "data-[focus=true]:after:w-full",
        ],
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
        trigger: "h-unit-8 min-h-unit-8 px-2 rounded-small",
        value: "text-small",
      },
      md: {
        trigger: "h-unit-10 min-h-unit-10 rounded-medium",
        value: "text-small",
      },
      lg: {
        trigger: "h-unit-12 min-h-unit-12 rounded-large",
        value: "text-medium",
      },
    },
    radius: {
      none: {
        trigger: "rounded-none",
      },
      sm: {
        trigger: "rounded-small",
      },
      md: {
        trigger: "rounded-medium",
      },
      lg: {
        trigger: "rounded-large",
      },
      full: {
        trigger: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        base: "data-[has-helper=true]:pb-4 flex flex-col",
        label: "text-foreground pb-1.5",
        description: "absolute left-1",
        errorMessage: "absolute left-1",
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap data-[has-helper=true]:pb-4",
        label: "text-foreground pr-2",
        description: "absolute left-1",
        errorMessage: "absolute left-1",
      },
      inside: {
        label: "text-tiny cursor-pointer",
        trigger: "flex-col items-start justify-center gap-0",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isLabelPlaceholder: {
      true: {
        label: "absolute z-10 pointer-events-none",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        trigger: "pointer-events-none",
        label: "pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        label: "!text-danger",
        value: "text-danger",
        selectorIcon: "text-danger",
      },
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5",
      },
    },
    isMultiline: {
      true: {
        trigger: "!h-auto",
      },
      false: {
        value: "truncate",
      },
    },
    disableAnimation: {
      true: {
        trigger: "after:transition-none",
        base: "transition-none",
        label: "transition-none",
        selectorIcon: "transition-none",
      },
      false: {
        base: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "origin-top-left",
          "transition-all",
          "!duration-200",
          "!ease-out",
          "motion-reduce:transition-none",
        ],
        selectorIcon: "transition-transform duration-150 ease motion-reduce:transition-none",
      },
    },
    disableSelectorIconRotation: {
      true: {},
      false: {
        selectorIcon: "data-[open=true]:rotate-180",
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    labelPlacement: "inside",
    fullWidth: true,
    isDisabled: false,
    isMultiline: false,
    disableAnimation: false,
    disableSelectorIconRotation: false,
  },
  compoundVariants: [
    // flat & color
    {
      variant: "flat",
      color: "primary",
      class: {
        trigger: [
          "bg-primary-50",
          "text-primary",
          "data-[hover=true]:bg-primary-100",
          "group-data-[focus=true]:bg-primary-50",
        ],
        value: "text-primary",
        label: "text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        trigger: [
          "bg-secondary-50",
          "text-secondary",
          "data-[hover=true]:bg-secondary-100",
          "group-data-[focus=true]:bg-secondary-50",
        ],
        value: "text-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        trigger: [
          "bg-success-50",
          "text-success-600",
          "dark:text-success",
          "data-[hover=true]:bg-success-100",
          "group-data-[focus=true]:bg-success-50",
        ],
        value: "text-success-600 dark:text-success",
        label: "text-success-600 dark:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        trigger: [
          "bg-warning-50",
          "text-warning-600",
          "dark:text-warning",
          "data-[hover=true]:bg-warning-100",
          "group-data-[focus=true]:bg-warning-50",
        ],
        value: "text-warning-600 dark:text-warning",
        label: "text-warning-600 dark:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        trigger: [
          "bg-danger-50",
          "text-danger",
          "dark:text-danger-500",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50",
        ],
        value: "text-danger dark:text-danger-500",
        label: "text-danger dark:text-danger-500",
      },
    },
    // faded & color
    {
      variant: "faded",
      color: "primary",
      class: {
        trigger: "data-[hover=true]:border-primary",
        label: "text-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        trigger: "data-[hover=true]:border-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        trigger: "data-[hover=true]:border-success",
        label: "text-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        trigger: "data-[hover=true]:border-warning",
        label: "text-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        trigger: "data-[hover=true]:border-danger",
        label: "text-danger",
      },
    },
    // underlined & color
    {
      variant: "underlined",
      color: "primary",
      class: {
        trigger: "after:bg-primary",
        label: "text-primary",
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        trigger: "after:bg-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        trigger: "after:bg-success",
        label: "text-success",
      },
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        trigger: "after:bg-warning",
        label: "text-warning",
      },
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        trigger: "after:bg-danger",
        label: "text-danger",
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "primary",
      class: {
        trigger: ["data-[open=true]:border-primary", "data-[focus=true]:border-primary"],
        label: "text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        trigger: ["data-[open=true]:border-secondary", "data-[focus=true]:border-secondary"],
        label: "text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        trigger: ["data-[open=true]:border-success", "data-[focus=true]:border-success"],
        label: "text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        trigger: ["data-[open=true]:border-warning", "data-[focus=true]:border-warning"],
        label: "text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        trigger: ["data-[open=true]:border-danger", "data-[focus=true]:border-danger"],
        label: "text-danger",
      },
    },
    // radius-full & size
    {
      radius: "full",
      size: ["sm"],
      class: {
        trigger: "px-3",
      },
    },
    {
      radius: "full",
      size: "md",
      class: {
        trigger: "px-4",
      },
    },
    {
      radius: "full",
      size: "lg",
      class: {
        trigger: "px-5",
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        trigger: "transition-colors motion-reduce:transition-none",
      },
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        trigger: "after:transition-width motion-reduce:after:transition-none",
      },
    },
    // flat & faded
    {
      variant: ["flat", "faded"],
      class: {
        trigger: [
          // focus ring
          ...dataFocusVisibleClasses,
        ],
      },
    },
    // isInvalid & variant
    {
      isInvalid: true,
      variant: "flat",
      class: {
        trigger: [
          "bg-danger-50",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50",
        ],
      },
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        trigger: "!border-danger group-data-[focus=true]:border-danger",
      },
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        trigger: "after:bg-danger",
      },
    },
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        trigger: "h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        trigger: "h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-small",
        trigger: "h-16 py-2.5 gap-0",
      },
    },
    // isLabelPlaceholder & labelPlacement
    {
      isLabelPlaceholder: true,
      labelPlacement: ["inside", "outside"],
      class: {
        label: [
          "font-normal",
          "group-data-[filled=true]:font-medium",
          "group-data-[filled=true]:pointer-events-auto",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      class: {
        base: "group relative justify-end",
        label: [
          "pb-0",
          "z-20",
          "opacity-60",
          "top-1/2",
          "-translate-y-1/2",
          "group-data-[filled=true]:opacity-100",
          "group-data-[filled=true]:left-0",
        ],
      },
    },
    // isLabelPlaceholder & inside & size
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: ["text-small", "group-data-[filled=true]:text-tiny"],
        input: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_3px)]"],
        innerWrapper: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)]",
        ],
        innerWrapper: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:text-small",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_5px)]",
        ],
        innerWrapper: "pt-5",
      },
    },
    // isLabelPlaceholder & outside & size
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "sm",
      class: {
        label: [
          "left-2",
          "text-small",
          "group-data-[filled=true]:text-tiny",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.tiny)/2_+_16px)]",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "md",
      class: {
        label: [
          "left-3",
          "text-small",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)]",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "lg",
      class: {
        label: [
          "left-3",
          "text-medium",
          "group-data-[filled=true]:text-small",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_24px)]",
        ],
      },
    },
  ],
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export {select};
