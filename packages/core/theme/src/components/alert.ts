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
    base: "flex flex-row w-full flex-grow min-h-17 max-h-full py-3 px-4",
    mainWrapper: [
      "flex-grow min-h-11 max-h-full ms-2 flex flex-col box-border items-start text-inherit",
    ],
    title: "w-full text-medium font-normal block min-h-6 max-h-full text-inherit",
    description: "text-small font-normal min-h-5 max-h-full text-inherit",
    closeButton: "relative text-inherit",
    alertIcon: "fill-current w-6",
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
        base: "items-center",
        mainWrapper: "justify-center",
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

    // flat / color
    {
      variant: "flat",
      color: "default",
      class: {
        base: [colorVariants.flat.default, "text-default-foreground"],
        description: "text-default-600",
        closeButton: "text-default-400",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: colorVariants.flat.primary,
        closeButton: "text-primary-400 data-[hover]:bg-primary-100",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: colorVariants.flat.secondary,
        closeButton: "text-secondary-400 data-[hover]:bg-secondary-100",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: colorVariants.flat.success,
        closeButton: "text-success-400 data-[hover]:bg-success-100",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: colorVariants.flat.warning,
        closeButton: "text-warning-500 data-[hover]:bg-warning-200",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: colorVariants.flat.danger,
        closeButton: "text-danger-400 data-[hover]:bg-danger-100",
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
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
