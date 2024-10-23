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
    base: ["flex flex-row max-w-[342px] flex-grow min-h-17 max-h-full p-3"],
    mainWrapper: [
      "flex-grow max-w-[268px] min-h-11 max-h-full ms-5 flex flex-col box-border items-start",
    ],
    title: ["w-full text-medium font-normal block min-h-6 max-h-full"],
    description: ["text-small font-normal min-h-5 max-h-full"],
    closeButton: ["w-6 h-6 cursor-pointer relative fill-current"],
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
        description: ["text-success-200"],
        closeButton: ["text-success-200"],
        alertIcon: ["text-success"],
      },
      warning: {
        base: ["bg-warning-50"],
        title: ["text-warning"],
        description: ["text-warning-200"],
        closeButton: ["text-warning-200"],
        alertIcon: ["text-warning"],
      },
      danger: {
        base: ["bg-danger-50"],
        title: ["text-danger"],
        description: ["text-danger-200"],
        closeButton: ["text-danger-200"],
        alertIcon: ["text-danger"],
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
