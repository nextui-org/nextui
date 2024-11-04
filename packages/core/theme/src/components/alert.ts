import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
/**
 * Alert wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, mainWrapper, title, description, closeButton, alertIcon} = alert({...})
 *
 *
 * <div className={base()}>
 *    {alertIcon}
 *    <div className={mainWrapper()}>
 *       <div className={title()}>Title</div>
 *       <div className={description()}>Description</div>
 *   </div>
 *    <button>
 *      // close button
 *    </button>
 * </div>
 * ```
 */
const alert = tv({
  slots: {
    base: ["flex flex-row w-full flex-grow min-h-17 max-h-full py-3 px-4"],
    mainWrapper: ["flex-grow min-h-11 max-h-full ms-2 flex flex-col box-border items-start"],
    title: ["w-full text-medium font-normal block min-h-6 max-h-full"],
    description: ["text-small font-normal min-h-5 max-h-full"],
    closeButton: ["relative fill-current"],
    alertIcon: ["fill-current"],
  },
  variants: {
    color: {
      default: {
        base: ["bg-default-100"],
        title: ["text-foreground"],
        description: ["text-default-600"],
        closeButton: ["text-default-400"],
        alertIcon: ["text-default-foreground"],
      },
      primary: {
        base: ["bg-primary-50"],
        title: ["text-primary"],
        description: ["text-primary"],
        closeButton: ["text-primary-200"],
        alertIcon: ["text-primary"],
      },
      secondary: {
        base: ["bg-secondary-50"],
        title: ["text-secondary"],
        description: ["text-secondary-200"],
        closeButton: ["text-secondary-200"],
        alertIcon: ["text-secondary"],
      },
      success: {
        base: ["bg-success-50"],
        title: ["text-success"],
        description: ["text-success-800 dark:text-success"],
        closeButton: ["text-success-200"],
        alertIcon: ["text-success"],
      },
      warning: {
        base: ["bg-warning-50"],
        title: ["text-warning"],
        description: ["text-warning-800 dark:text-warning"],
        closeButton: ["text-warning-200"],
        alertIcon: ["text-warning"],
      },
      danger: {
        base: ["bg-danger-50"],
        title: ["text-danger"],
        description: ["text-danger-800 dark:text-danger"],
        closeButton: ["text-danger-200"],
        alertIcon: ["text-danger"],
      },
    },
    variant: {
      solid: {},
      flat: {},
      bordered: {
        base: "border-medium bg-transparent",
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
    hasDescription: {
      true: {
        alertIcon: "mt-0.5",
      },
      false: {
        base: ["items-center"],
        mainWrapper: ["justify-center"],
      },
    },
  },
  defaultVariants: {
    color: "default",
    variant: "flat",
    radius: "md",
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: {
        base: "bg-default",
        title: "text-default-foreground",
        description: "text-default-foreground",
        closeButton: "text-default-foreground data-[hover]:bg-default-100",
        alertIcon: "text-default-foreground",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary",
        title: "text-primary-foreground",
        description: "text-primary-foreground",
        closeButton: "text-primary-foreground",
        alertIcon: "text-primary-foreground",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary",
        title: "text-secondary-foreground",
        description: "text-secondary-foreground",
        closeButton: "text-secondary-foreground",
        alertIcon: "text-secondary-foreground",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success",
        title: "text-success-foreground",
        description: "text-success-foreground",
        closeButton: "text-success-foreground",
        alertIcon: "text-success-foreground",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning",
        title: "text-warning-foreground",
        description: "text-warning-foreground",
        closeButton: "text-warning-foreground",
        alertIcon: "text-warning-foreground",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "bg-danger",
        title: "text-danger-foreground",
        description: "text-danger-foreground",
        closeButton: "text-danger-foreground",
        alertIcon: "text-danger-foreground",
      },
    },

    // flat / color
    {
      variant: "flat",
      color: "default",
      class: {
        base: "bg-default-100",
        title: "text-default-foreground",
        description: "text-default-600",
        closeButton: "text-default-400",
        alertIcon: "text-default-foreground",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-50",
        title: "text-primary",
        description: "text-primary-600",
        closeButton: "text-primary-400 data-[hover]:bg-primary-100",
        alertIcon: "text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-50",
        title: "text-secondary",
        description: "text-secondary-600",
        closeButton: "text-secondary-400 data-[hover]:bg-secondary-100",
        alertIcon: "text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-success-50",
        title: "text-success",
        description: "text-success-800 dark:text-success",
        closeButton: "text-success-400 data-[hover]:bg-success-100",
        alertIcon: "text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-warning-50",
        title: "text-warning",
        description: "text-warning-800 dark:text-warning",
        closeButton: "text-warning-500 data-[hover]:bg-warning-200",
        alertIcon: "text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "bg-danger-50",
        title: "text-danger",
        description: "text-danger-800 dark:text-danger",
        closeButton: "text-danger-400 data-[hover]:bg-danger-100",
        alertIcon: "text-danger",
      },
    },

    // bordered / color
    {
      variant: "bordered",
      color: "default",
      class: {
        base: "border-default-200",
        title: "text-default-foreground",
        description: "text-default-600",
        closeButton: "text-default-400",
        alertIcon: "text-default-foreground",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "border-primary",
        title: "text-primary",
        description: "text-primary-600",
        closeButton: "text-primary-400 data-[hover]:bg-primary-50",
        alertIcon: "text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "border-secondary",
        title: "text-secondary",
        description: "text-secondary-600",
        closeButton: "text-secondary-400 data-[hover]:bg-secondary-50",
        alertIcon: "text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "border-success",
        title: "text-success",
        description: "text-success-600",
        closeButton: "text-success-400 data-[hover]:bg-success-50",
        alertIcon: "text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "border-warning",
        title: "text-warning",
        description: "text-warning-600",
        closeButton: "text-warning-500 data-[hover]:bg-warning-100",
        alertIcon: "text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "border-danger",
        title: "text-danger",
        description: "text-danger-600",
        closeButton: "text-danger-400 data-[hover]:bg-danger-50",
        alertIcon: "text-danger",
      },
    },
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
