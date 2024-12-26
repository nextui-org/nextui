import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const toast = tv({
  slots: {
    base: [
      "flex gap-x-4 items-center",
      "group",
      "cursor-pointer",
      "relative",
      "z-500",
      "box-border",
      "outline-none",
      "p-4 px-6 mx-1",
      "my-1",
      "sm:mx-4",
      "sm:my-4",
      "max-w-[542px]",
      "rounded-md",
      "text-white",
      "shadow-inner",
    ],
    title: ["font-medium", "ms-4", "text-sm"],
    description: ["font-light", "ms-4", "text-xs"],
    icon: ["w-6 h-6 fill-current"],
    content: ["flex flex-grow flex-row gap-x-1 items-center relative"],
    progressBar: [
      "absolute",
      "h-[2px]",
      "right-0",
      "-bottom-3",
      "w-full",
      "overflow-hidden",
      "rounded-full",
    ],
    progressTrack: ["bg-default-200"],
    progressIndicator: ["bg-default-400"],
    closeButton: [
      "opacity-0 group-hover:opacity-100 w-4 h-4 min-w-4 p-0.5 absolute -right-1 -top-1 items-center justify-center bg-default-100 hover:bg-default-200 text-default-400 hover:text-default-600 border border-1 border-default-400",
    ],
  },
  variants: {
    size: {
      sm: {
        icon: "w-4 h-4",
        title: "text-sm font-medium",
        description: "text-xs font-light",
      },
      md: {
        icon: "w-6 h-6",
        title: "text-sm font-semibold",
        description: "text-xs font-light",
      },
      lg: {
        icon: "w-8 h-8",
        title: "text-md font-semibold",
        description: "text-sm font-light",
      },
    },
    variant: {
      flat: "bg-default-50",
      faded: "bg-default border border-1 border-default-400",
      solid: "bg-default shadow-inner",
      bordered: "bg-white dark:bg-black border border-1 border-default-400",
    },
    color: {
      default: "",
      primary: {
        progressTrack: "bg-primary-200",
        progressIndicator: "bg-primary-400",
      },
      secondary: {
        progressTrack: "bg-secondary-200",
        progressIndicator: "bg-secondary-400",
      },
      success: {
        progressTrack: "bg-success-200",
        progressIndicator: "bg-success-400",
      },
      warning: {
        progressTrack: "bg-warning-200",
        progressIndicator: "bg-warning-400",
      },
      danger: {
        progressTrack: "bg-danger-200",
        progressIndicator: "bg-danger-400",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
      full: {
        base: "rounded-full",
      },
    },
    disableAnimation: {
      true: {
        closeButton: "transition-none",
      },
      false: {
        closeButton: "transition-opacity ease-in duration-300",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "flat",
    radius: "md",
  },
  compoundVariants: [
    // flat and color
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-100/40 text-primary-400",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-100/40 text-secondary-400",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-success-100/40 text-success-400",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-warning-100/40 text-warning-400",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "bg-danger-100/40 text-danger-400",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
      },
    },
    // faded and color
    {
      variant: "faded",
      color: "primary",
      class: {
        base: "bg-primary-100/40 text-primary-400 border-primary-400",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: "bg-secondary-100/40 text-secondary-400 border-secondary-400",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "bg-success-100/40 text-success-400 border-success-400",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "bg-warning-100/40 text-warning-400 border-warning-400",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "bg-danger-100/40 text-danger-400 border-danger-400",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
      },
    },
    // bordered and color
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "border-primary-400 text-primary-400",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "border-secondary-400 text-secondary-400",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "border-success-400 text-success-400",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "border-warning-400 text-warning-400",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "border-danger-400 text-danger-400",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
      },
    },
    // solid and color
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary-100 text-default-600",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary-100 text-default-600",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success-100 text-default-600",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning-100 text-default-600",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "bg-danger-100 text-default-600",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
      },
    },
  ],
});

export type ToastVariantProps = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export {toast};
