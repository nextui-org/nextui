import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants} from "../utils";
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
    base: "flex flex-grow flex-row w-full items-start py-3 px-4 gap-x-1",
    mainWrapper:
      "h-full flex-grow min-h-10 ms-2 flex flex-col box-border items-start text-inherit justify-center",
    title: "text-small w-full font-medium block text-inherit leading-5",
    description: "pl-[1px] text-small font-normal text-inherit",
    closeButton: "relative text-inherit translate-x-1 -translate-y-1",
    iconWrapper: "flex-none relative w-9 h-9 rounded-full grid place-items-center",
    alertIcon: "fill-current w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  variants: {
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    variant: {
      solid: {},
      flat: {},
      faded: {
        base: "border-small",
      },
      bordered: {
        base: "border-small bg-transparent",
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
    hideIcon: {
      true: {
        iconWrapper: "hidden",
      },
    },
    hideIconWrapper: {
      true: {
        base: "gap-x-0",
        iconWrapper: "!bg-transparent !shadow-none !border-none",
      },
    },
    hasContent: {
      false: {
        base: "items-start",
        mainWrapper: "justify-center items-center",
      },
    },
  },
  defaultVariants: {
    color: "default",
    variant: "flat",
    radius: "md",
    hideIcon: false,
    hideIconWrapper: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: {
        base: colorVariants.solid.default,
        closeButton: "data-[hover]:bg-default-100",
        alertIcon: "text-default-foreground",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary,
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary,
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success,
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning,
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger,
      },
    },
    // flat & faded / color
    {
      variant: ["flat", "faded"],
      color: "default",
      class: {
        base: [
          colorVariants.flat.default,
          "bg-default-100 dark:bg-default-50/50",
          "text-default-foreground",
        ],
        description: "text-default-600",
        closeButton: "text-default-400",
        iconWrapper: "bg-default-50 dark:bg-default-100 border-default-200",
      },
    },
    {
      variant: ["flat", "faded"],
      color: "primary",
      class: {
        base: [colorVariants.flat.primary, "bg-primary-50 dark:bg-primary-50/50"],
        closeButton: "text-primary-500 data-[hover]:bg-primary-200",
        iconWrapper: "bg-primary-50 dark:bg-primary-100 border-primary-100",
      },
    },
    {
      variant: ["flat", "faded"],
      color: "secondary",
      class: {
        base: [colorVariants.flat.secondary, "bg-secondary-50 dark:bg-secondary-50/50"],
        closeButton: "text-secondary-500 data-[hover]:bg-secondary-200",
        iconWrapper: "bg-secondary-50 dark:bg-secondary-100 border-secondary-100",
      },
    },
    {
      variant: ["flat", "faded"],
      color: "success",
      class: {
        base: [colorVariants.flat.success, "bg-success-50 dark:bg-success-50/50"],
        closeButton: "text-success-500 data-[hover]:bg-success-200",
        iconWrapper: "bg-success-50 dark:bg-success-100 border-success-100",
      },
    },
    {
      variant: ["flat", "faded"],
      color: "warning",
      class: {
        base: [colorVariants.flat.warning, "bg-warning-50 dark:bg-warning-50/50"],
        closeButton: "text-warning-500 data-[hover]:bg-warning-200",
        iconWrapper: "bg-warning-50 dark:bg-warning-100 border-warning-100",
      },
    },
    {
      variant: ["flat", "faded"],
      color: "danger",
      class: {
        base: [colorVariants.flat.danger, "bg-danger-50 dark:bg-danger-50/50"],
        closeButton: "text-danger-500 data-[hover]:bg-danger-200",
        iconWrapper: "bg-danger-50 dark:bg-danger-100 border-danger-100",
      },
    },
    // faded / color
    {
      variant: "faded",
      color: "default",
      class: {
        base: "border-default-300 dark:border-default-200",
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: "border-primary-200 dark:border-primary-100",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: "border-secondary-200",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "border-success-300 dark:border-success-100",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "border-warning-300 dark:border-warning-100",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "border-danger-200 dark:border-danger-100",
      },
    },
    // bordered / color
    {
      variant: "bordered",
      color: "default",
      class: {
        base: [colorVariants.bordered.default],
        description: "text-default-600",
        closeButton: "text-default-400",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: [colorVariants.bordered.primary],
        closeButton: "data-[hover]:bg-primary-50",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: [colorVariants.bordered.secondary],
        closeButton: "data-[hover]:bg-secondary-50",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: [colorVariants.bordered.success],
        closeButton: "data-[hover]:bg-success-50",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: [colorVariants.bordered.warning],
        closeButton: "data-[hover]:bg-warning-100",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: [colorVariants.bordered.danger],
        closeButton: "data-[hover]:bg-danger-50",
      },
    },
    // flat & bordered & faded
    {
      variant: ["flat", "bordered", "faded"],
      class: {
        iconWrapper: "shadow-small",
      },
    },
    // flat & faded
    {
      variant: ["flat", "faded"],
      class: {
        iconWrapper: "shadow-small border-1",
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "default",
      class: {
        iconWrapper: "bg-default-200 dark:bg-default-100",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        iconWrapper: "bg-primary-100 dark:bg-primary-50",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        iconWrapper: "bg-secondary-100 dark:bg-secondary-50",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        iconWrapper: "bg-success-100 dark:bg-success-50",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        iconWrapper: "bg-warning-100 dark:bg-warning-50",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        iconWrapper: "bg-danger-100 dark:bg-danger-50",
      },
    },
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
