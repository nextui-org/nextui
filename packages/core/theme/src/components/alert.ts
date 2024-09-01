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
 *    <div className = {icon()}>
 *    // icon
 *     </div>
 *
 *    <div className = "innerwrapper">
 *        // start content comes here if present
 *         <div classsName ={mainWrapper()}>
 *           <div className={title()}>Title</div>
 *           <div className={description()}>Description</div>
 *        </div>
 *       // end content comes here if present
 *     </div>
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
        title: ["text-[#F7B750]"],
        description: ["text-[#F7B750]"],
      },
      danger: {
        base: ["bg-danger-50 "],
        title: ["text-[#F31260]"],
        description: ["text-[#F31260]"],
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
