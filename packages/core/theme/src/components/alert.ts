import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
/**
 * Alert wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, mainWrapper, title, description, closeButton, closeIcon} = alert({...})
 *
 * <div className={base()}>
 *    <AlertIcon/>
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
    base: ["flex flex-row w-[260px] sm:w-[342px] h-17  p-3"],
    title: ["text-medium font-normal block h-6"],
    description: ["text-small font-normal h-5"],
    mainWrapper: ["sm:w-[268px] w-[186px] h-11 ms-5 flex flex-col box-border items-start"],
    closeButton: ["w-6 h-6 cursor-pointer relative"],
    closeIcon: ["fill-current"],
  },
  variants: {
    color: {
      default: {
        base: ["bg-default-100"],
        title: ["text-foreground"],
        description: ["text-default-600"],
        closeIcon: ["text-default-400"],
      },
      primary: {
        base: ["bg-primary-50"],
        title: ["text-primary"],
        description: ["text-primary"],
        closeIcon: ["text-primary-200"],
      },
      secondary: {
        base: ["bg-secondary-50"],
        title: ["text-secondary"],
        description: ["text-secondary-200"],
        closeIcon: ["text-secondary-200"],
      },
      success: {
        base: ["bg-success-50"],
        title: ["text-success"],
        description: ["text-success-200"],
        closeIcon: ["text-success-200"],
      },
      warning: {
        base: ["bg-warning-50"],
        title: ["text-warning"],
        description: ["text-warning-200"],
        closeIcon: ["text-warning-200"],
      },
      danger: {
        base: ["bg-danger-50"],
        title: ["text-danger"],
        description: ["text-danger-200"],
        closeIcon: ["text-danger-200"],
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
  },
  defaultVariants: {
    color: "default",
    radius: "md",
  },
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
