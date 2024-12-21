import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const toast = tv({
  slots: {
    wrapper: [
      "flex",
      "w-screen",
      "min-h-10",
      "fixed",
      "inset-0",
      "z-50",
      "overflow-x-auto",
      "justify-center",
    ],
    base: [
      "flex",
      "flex-col",
      "relative",
      "bg-white",
      "z-50",
      "w-full",
      "box-border",
      "outline-none",
      "p-2 px-4 mx-1",
      "my-1",
      "sm:mx-4",
      "sm:my-4",
      "max-w-[542px]",
      "rounded-md",
      "text-white",
      "shadow-inner",
    ],
    icon: ["w-6 h-6"],
    content: ["flex flex-grow flex-row gap-x-1 items-center"],
    title: ["font-medium", "ms-4"],
    description: ["font-light", "ms-4"],
    progressBar: [
      "absolute",
      "h-[2px]",
      "right-0",
      "bottom-0",
      "w-full",
      "overflow-hidden",
      "bg-black-500",
      "rounded-none",
    ],
    closeButton: [
      "w-4 h-4 min-w-4 p-0.5 absolute -right-1 -top-1 flex items-center justify-center bg-default-100 hover:bg-default-200 text-default-400 hover:text-default-600 border border-1 border-default-400",
    ],
  },
  variants: {
    size: {
      xs: "",
    },
    variant: {
      flat: "bg-default",
      faded: "bg-default border border-1 border-default-400",
      solid: "bg-default shadow-inner",
      bordered: "bg-white dark:bg-black border border-1 border-default-400",
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
    },
  },
  defaultVariants: {
    size: "xs",
    variant: "flat",
  },
  compoundVariants: [
    // flat and color
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-100/40 text-primary-400",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-100/40 text-secondary-400",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "bg-success-100/40 text-success-400",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "bg-warning-100/40 text-warning-400",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "bg-danger-100/40 text-danger-400",
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
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
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
