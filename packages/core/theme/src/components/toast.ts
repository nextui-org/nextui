import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const toast = tv({
  slots: {
    base: [
      "flex gap-x-4 items-center",
      "group",
      "cursor-pointer",
      "relative",
      "z-[9999]",
      "box-border",
      "outline-none",
      "p-3 mx-1",
      "my-1",
      "w-[210px] sm:w-[270px] md:w-[300px]",
      "min-h-4",
    ],
    title: ["font-medium", "text-small", "me-4", "text-foreground"],
    description: ["text-small", "me-4", "text-default-600"],
    icon: ["w-6 h-6 fill-current"],
    content: ["flex flex-grow flex-row gap-x-4 items-center relative"],
    progressTrack: ["absolute h-[2px] left-0 -bottom-2 w-full bg-default-200"],
    progressIndicator: ["absolute h-[2px] left-0 bg-default-400"],
    motionDiv: [
      "fixed",
      "data-[drag=true]:before:content-[''] data-[drag=true]:before:absolute data-[drag=true]:before:left-0 data-[drag=true]:before:right-0 data-[drag=true]:before:h-full data-[drag=true]:before:-z-10",
      "data-[position=right-bottom]:bottom-0 data-[position=right-bottom]:right-0 data-[position=right-bottom]:mx-auto data-[position=right-bottom]:w-max data-[position=right-bottom]:mr-2",
      "data-[position=left-bottom]:bottom-0 data-[position=left-bottom]:left-0 data-[position=left-bottom]:mx-auto data-[position=left-bottom]:w-max data-[position=left-bottom]:ml-2",
      "data-[position=center-bottom]:bottom-0 data-[position=center-bottom]:left-0 data-[position=center-bottom]:right-0 data-[position=center-bottom]:w-max data-[position=center-bottom]:mx-auto",
      "data-[position=right-top]:top-0 data-[position=right-top]:right-0 data-[position=right-top]:mx-auto data-[position=right-top]:w-max data-[position=right-top]:mr-2",
      "data-[position=left-top]:top-0 data-[position=left-top]:left-0 data-[position=left-top]:mx-auto data-[position=left-top]:w-max data-[position=left-top]:ml-2",
      "data-[position=center-top]:top-0 data-[position=center-top]:left-0 data-[position=center-top]:right-0 data-[position=center-top]:w-max data-[position=center-top]:mx-auto",
    ],
    closeButton: [
      "opacity-0 p-0 group-hover:opacity-100 w-6 h-6 min-w-4 absolute -right-2 -top-2 items-center justify-center bg-transparent text-default-400 hover:text-default-600 border border-3 border-transparent",
    ],
    closeIcon: [
      "rounded-full w-full h-full p-0.5 border border-1 border-default-400 bg-default-100",
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
        title: "text-sm font-semibold",
        description: "text-xs font-light",
      },
      lg: {
        title: "text-md font-semibold",
        description: "text-sm font-light",
      },
    },
    variant: {
      flat: "bg-content1",
      faded: "bg-default-50 border border-1 border-default-200",
      solid: "bg-default-50 shadow-inner",
      bordered: "bg-white dark:bg-black border border-1 border-default-200",
    },
    color: {
      default: "",
      foreground: {
        progressTrack: "bg-foreground-200",
        progressIndicator: "bg-foreground-400",
      },
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
        closeButton: "top-0 right-px",
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
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-small",
      },
      md: {
        base: "shadow-medium",
      },
      lg: {
        base: "shadow-large",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "flat",
    radius: "md",
    shadow: "sm",
  },
  compoundVariants: [
    // flat and color
    {
      variant: "flat",
      color: "foreground",
      class: {
        base: "bg-foreground-50 text-foreground-600",
        closeButton:
          "bg-foreground-100 hover:bg-foreground-200 border-foreground-400 text-foreground-400",
        title: "text-foreground-600",
        description: "text-foreground-400",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-50 text-primary-600",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-50 text-secondary-600",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-success-50 text-success-600",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-warning-50 text-warning-600",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "bg-danger-50 text-danger-600",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
    // faded and color
    {
      variant: "faded",
      color: "foreground",
      class: {
        base: "bg-foreground-50 text-foreground-400 border-foreground-600",
        closeButton:
          "bg-foreground-100 hover:bg-foreground-200 border-foreground-400 text-foreground-400",
        title: "text-foreground-600",
        description: "text-foreground-400",
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: "bg-primary-50 text-primary-400 border-primary-600",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: "bg-secondary-50 text-secondary-400 border-secondary-600",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "bg-success-50 text-success-400 border-success-600",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "bg-warning-50 text-warning-400 border-warning-600",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "bg-danger-50 text-danger-400 border-danger-600",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
    // bordered and color
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "border-primary-400 text-primary-600",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "bordered",
      color: "foreground",
      class: {
        base: "border-foreground-400 text-foreground-600",
        closeButton:
          "bg-foreground-100 hover:bg-foreground-200 border-foreground-400 text-foreground-400",
        title: "text-foreground-600",
        description: "text-foreground-400",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "border-secondary-400 text-secondary-600",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "border-success-400 text-success-600",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "border-warning-400 text-warning-600",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "border-danger-400 text-danger-600",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
    // solid and color
    {
      variant: "solid",
      color: "foreground",
      class: {
        base: "bg-foreground-100 text-foreground-600",
        closeButton:
          "bg-foreground-100 hover:bg-foreground-200 border-foreground-400 text-foreground-400",
        title: "text-foreground-600",
        description: "text-foreground-400",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary-100 text-primary-600",
        closeButton: "bg-primary-100 hover:bg-primary-200 border-primary-400 text-primary-400",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary-100 text-secondary-600",
        closeButton:
          "bg-secondary-100 hover:bg-secondary-200 border-secondary-400 text-secondary-400",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success-100 text-success-600",
        closeButton: "bg-success-100 hover:bg-success-200 border-success-400 text-success-400",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning-100 text-warning-600",
        closeButton: "bg-warning-100 hover:bg-warning-200 border-warning-400 text-warning-400",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "bg-danger-100 text-danger-600",
        closeButton: "bg-danger-100 hover:bg-danger-200 border-danger-400 text-danger-400",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
  ],
});

export type ToastVariantProps = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export {toast};
