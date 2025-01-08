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
      "p-3 sm:mx-1",
      "my-1",
      "w-full sm:w-[270px] md:w-[300px]",
      "min-h-4",
    ],
    title: ["font-medium", "text-small", "me-4", "text-foreground"],
    description: ["text-small", "me-4", "text-default-600"],
    icon: ["w-6 h-6 fill-current"],
    loadingIcon: ["w-6 h-6 fill-current"],
    content: ["flex flex-grow flex-row gap-x-4 items-center relative"],
    progressTrack: ["absolute top-0 inset-0 bg-transparent overflow-hidden"],
    progressIndicator: ["h-full bg-default-400 opacity-20"],
    motionDiv: [
      "fixed",
      "px-4 sm:px-0",
      "data-[drag=true]:before:content-[''] data-[drag=true]:before:absolute data-[drag=true]:before:left-0 data-[drag=true]:before:right-0 data-[drag=true]:before:h-full data-[drag=true]:before:-z-10",
      "data-[placement=right-bottom]:bottom-0 data-[placement=right-bottom]:right-0 data-[placement=right-bottom]:mx-auto w-full sm:data-[placement=right-bottom]:w-max mb-1 sm:data-[placement=right-bottom]:mr-2",
      "data-[placement=left-bottom]:bottom-0 data-[placement=left-bottom]:left-0 data-[placement=left-bottom]:mx-auto w-full sm:data-[placement=left-bottom]:w-max mb-1 sm:data-[placement=left-bottom]:ml-2",
      "data-[placement=center-bottom]:bottom-0 data-[placement=center-bottom]:left-0 data-[placement=center-bottom]:right-0 w-full sm:data-[placement=center-bottom]:w-max sm:data-[placement=center-bottom]:mx-auto",
      "data-[placement=right-top]:top-0 data-[placement=right-top]:right-0 data-[placement=right-top]:mx-auto w-full sm:data-[placement=right-top]:w-max sm:data-[placement=right-top]:mr-2",
      "data-[placement=left-top]:top-0 data-[placement=left-top]:left-0 data-[placement=left-top]:mx-auto w-full sm:data-[placement=left-top]:w-max sm:data-[placement=left-top]:ml-2",
      "data-[placement=center-top]:top-0 data-[placement=center-top]:left-0 data-[placement=center-top]:right-0 w-full sm:data-[placement=center-top]:w-max sm:data-[placement=center-top]:mx-auto",
    ],
    closeButton: [
      "opacity-0 p-0 group-hover:opacity-100 w-6 h-6 min-w-4 absolute -right-2 -top-2 items-center justify-center bg-transparent text-default-400 hover:text-default-600 border border-3 border-transparent",
    ],
    closeIcon: ["rounded-full w-full h-full p-0.5 border border-default-400 bg-default-100"],
  },
  variants: {
    size: {
      sm: {
        icon: "w-5 h-5",
        loadingIcon: "w-5 h-5",
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
      flat: "bg-content1 border border-default-100",
      solid: "bg-default text-default-foreground",
      bordered: "bg-background border border-default-200",
    },
    color: {
      default: "",
      foreground: {
        progressIndicator: "h-full opacity-20 bg-foreground-400",
      },
      primary: {
        progressIndicator: "h-full opacity-20 bg-primary-400",
      },
      secondary: {
        progressIndicator: "h-full opacity-20 bg-secondary-400",
      },
      success: {
        progressIndicator: "h-full opacity-20 bg-success-400",
      },
      warning: {
        progressIndicator: "h-full opacity-20 bg-warning-400",
      },
      danger: {
        progressIndicator: "h-full opacity-20 bg-danger-400",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
        progressTrack: "rounded-none",
      },
      sm: {
        base: "rounded-small",
        progressTrack: "rounded-small",
      },
      md: {
        base: "rounded-medium",
        progressTrack: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
        progressTrack: "rounded-large",
      },
      full: {
        base: "rounded-full",
        closeButton: "-top-px -right-px",
        progressTrack: "rounded-full",
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
        base: "bg-foreground text-background",
        closeButton: "text-foreground-400 hover:text-foreground-600",
        closeIcon: "border border-foreground-400 bg-foreground-100",
        title: "text-background-600",
        description: "text-background-400",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-50 text-primary-600 border-primary-100",
        closeButton: "text-primary-400 hover:text-primary-600",
        closeIcon: "border border-primary-400 bg-primary-100",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-50 text-secondary-600 border-secondary-100",
        closeButton: "text-secondary-400 hover:text-secondary-600",
        closeIcon: "border border-secondary-400 bg-secondary-100",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-success-50 text-success-600 border-success-100",
        closeButton: "text-success-400 hover:text-success-600",
        closeIcon: "border border-success-400 bg-success-100",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-warning-50 text-warning-600 border-warning-100",
        closeButton: "text-warning-400 hover:text-warning-600",
        closeIcon: "border border-warning-400 bg-warning-100",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "bg-danger-50 text-danger-600 border-danger-100",
        closeButton: "text-danger-400 hover:text-danger-600",
        closeIcon: "border border-danger-400 bg-danger-100",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
    // bordered and color
    {
      variant: "bordered",
      color: "foreground",
      class: {
        base: "bg-foreground border-foreground-400 text-background",
        closeButton: "text-foreground-400 hover:text-foreground-600",
        closeIcon: "border border-foreground-400 bg-foreground-100",
        title: "text-background-600",
        description: "text-background-400",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "border-primary-400 text-primary-600",
        closeButton: "text-primary-400 hover:text-primary-600",
        closeIcon: "border border-primary-400 bg-primary-100",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "border-secondary-400 text-secondary-600",
        closeButton: "text-secondary-400 hover:text-secondary-600",
        closeIcon: "border border-secondary-400 bg-secondary-100",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "border-success-400 text-success-600",
        closeButton: "text-success-400 hover:text-success-600",
        closeIcon: "border border-success-400 bg-success-100",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "border-warning-400 text-warning-600",
        closeButton: "text-warning-400 hover:text-warning-600",
        closeIcon: "border border-warning-400 bg-warning-100",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "border-danger-400 text-danger-600",
        closeButton: "text-danger-400 hover:text-danger-600",
        closeIcon: "border border-danger-400 bg-danger-100",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
    // solid and color
    {
      variant: "solid",
      color: "foreground",
      class: {
        base: "bg-foreground text-background",
        closeButton: "text-foreground-400 hover:text-foreground-600",
        closeIcon: "border border-foreground-400 bg-foreground-100",
        title: "text-background-600",
        description: "text-background-400",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary-100 text-primary-600",
        closeButton: "text-primary-400 hover:text-primary-600",
        closeIcon: "border border-primary-400 bg-primary-100",
        title: "text-primary-600",
        description: "text-primary-400",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary-100 text-secondary-600",
        closeButton: "text-secondary-400 hover:text-secondary-600",
        closeIcon: "border border-secondary-400 bg-secondary-100",
        title: "text-secondary-600",
        description: "text-secondary-400",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success-100 text-success-600",
        closeButton: "text-success-400 hover:text-success-600",
        closeIcon: "border border-success-400 bg-success-100",
        title: "text-success-600",
        description: "text-success-400",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning-100 text-warning-600",
        closeButton: "text-warning-400 hover:text-warning-600",
        closeIcon: "border border-warning-400 bg-warning-100",
        title: "text-warning-600",
        description: "text-warning-400",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "bg-danger-100 text-danger-600",
        closeButton: "text-danger-400 hover:text-danger-600",
        closeIcon: "border border-danger-400 bg-danger-100",
        title: "text-danger-600",
        description: "text-danger-400",
      },
    },
  ],
});

export type ToastVariantProps = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export {toast};
