import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
/**
 * Alert wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, mainWrapper, title, description} = input({...})
 *
 * <div className={base())}>
 *    // icon
 *
 *    <div classsName ={mainWrapper()}>
 *       <div className={title()}>Title</div>
 *       <div className={description()}>Description</div>
 *   </div>
 *
 *    <button>
 *      // close button
 *    </button>
 * </div>
 * ```
 */

const alert = tv({
  slots: {
    base: ["group flex flex-row w-[342px] h-[68px]  p-[12px]"],
    title: ["text-medium font-normal block h-[24px]"],
    description: ["text-small font-normal h-[20px]"],
    mainWrapper: ["w-[268px] h-[44px] ml-[20px] flex flex-col box-border items-start"],
    closeButton: ["w-[24px h-[24px] cursor-pointer relative"],
  },
  variants: {
    color: {
      default: {
        base: ["bg-default-100"],
        title: ["text-foreground"],
        description: ["text-[default-600]"],
      },
      primary: {
        base: ["bg-primary-50"],
        title: ["text-primary"],
        description: ["text-primary"],
      },
      secondary: {
        base: ["bg-secondary-50"],
        title: ["text-secondary"],
        description: ["text-secondary"],
      },
      success: {
        base: ["bg-success-50"],
        title: ["text-success"],
        description: ["text-success"],
      },
      warning: {
        base: ["bg-warning-50"],
        title: ["text-warning"],
        description: ["text-warning"],
      },
      danger: {
        base: ["bg-danger-50"],
        title: ["text-danger"],
        description: ["text-danger"],
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-[12px]",
      },
      md: {
        base: "rounded-[16px]",
      },
      lg: {
        base: "rounded-[22px]",
      },
      full: {
        base: "rounded-[9999px]",
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
