import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Toggle (Switch) wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, thumb, thumbIcon, label, startIcon, endIcon} = toggle({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-checked={true/false}
 *    data-pressed={true/false}
 *    data-focus={true/false}
 *    data-hover={true/false}
 *    data-focus-visible={true/false}
 * >
 *  <input/> // hidden input
 *  <span className={wrapper()} aria-hidden="true">
 *    <svg className={startIcon()}>...</svg>
 *    <span className={thumb()}>
 *      <svg className={thumbIcon()}>...</svg>
 *    </span>
 *    <svg className={endIcon()}>...</svg>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const toggle = tv({
  slots: {
    base:
      "group relative max-w-fit inline-flex items-center justify-start cursor-pointer touch-none",
    wrapper: [
      "px-1",
      "relative",
      "inline-flex",
      "items-center",
      "justify-start",
      "flex-shrink-0",
      "overflow-hidden",
      "bg-neutral-200",
      "rounded-full",
      // focus ring
      "group-data-[focus-visible]:outline-none",
      "group-data-[focus-visible]:ring-2",
      "group-data-[focus-visible]:!ring-primary",
      "group-data-[focus-visible]:ring-offset-2",
      "group-data-[focus-visible]:ring-offset-background",
      "group-data-[focus-visible]:dark:ring-offset-background-dark",
    ],
    thumb: [
      "z-10",
      "flex",
      "items-center",
      "justify-center",
      "bg-white",
      "shadow-sm",
      "rounded-full",
      "origin-right",
    ],
    startIcon: "z-0 absolute left-1.5 text-current",
    endIcon: "z-0 absolute right-1.5 text-neutral-600",
    thumbIcon: "text-black",
    label: "relative text-foreground select-none",
  },
  variants: {
    color: {
      neutral: {
        wrapper: [
          "group-data-[checked=true]:bg-neutral-400",
          "group-data-[checked=true]:text-neutral-foreground",
        ],
      },
      primary: {
        wrapper: [
          "group-data-[checked=true]:bg-primary",
          "group-data-[checked=true]:text-primary-foreground",
        ],
      },
      secondary: {
        wrapper: [
          "group-data-[checked=true]:bg-secondary",
          "group-data-[checked=true]:text-secondary-foreground",
        ],
      },
      success: {
        wrapper: [
          "group-data-[checked=true]:bg-success",
          "group-data-[checked=true]:text-success-foreground",
        ],
      },
      warning: {
        wrapper: [
          "group-data-[checked=true]:bg-warning",
          "group-data-[checked=true]:text-warning-foreground",
        ],
      },
      danger: {
        wrapper: [
          "group-data-[checked=true]:bg-danger",
          "data-[checked=true]:text-danger-foreground",
        ],
      },
    },
    size: {
      xs: {
        wrapper: "w-8 h-5 mr-1",
        thumb: [
          "w-3 h-3 text-[0.6rem]",
          //checked
          "group-data-[checked=true]:ml-3",
          // pressed
          "group-data-[pressed=true]:w-4",
          "group-data-[checked]:group-data-[pressed]:ml-2",
        ],
        startIcon: "text-[0.6rem] left-1",
        endIcon: "text-[0.6rem] right-1",
        label: "text-sm",
      },
      sm: {
        wrapper: "w-10 h-6 mr-2",
        thumb: [
          "w-4 h-4 text-xs",
          //checked
          "group-data-[checked=true]:ml-4",
          // pressed
          "group-data-[pressed=true]:w-5",
          "group-data-[checked]:group-data-[pressed]:ml-4",
        ],
        endIcon: "text-xs",
        startIcon: "text-xs",
        label: "text-base",
      },
      md: {
        wrapper: "w-12 h-7 mr-2",
        thumb: [
          "w-5 h-5 text-sm",
          //checked
          "group-data-[checked=true]:ml-5",
          // pressed
          "group-data-[pressed=true]:w-6",
          "group-data-[checked]:group-data-[pressed]:ml-4",
        ],
        endIcon: "text-sm",
        startIcon: "text-sm",
        label: "text-lg",
      },
      lg: {
        wrapper: "w-14 h-8 mr-2",
        thumb: [
          "w-6 h-6 text-base",
          //checked
          "group-data-[checked=true]:ml-6",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[checked]:group-data-[pressed]:ml-5",
        ],
        endIcon: "text-base",
        startIcon: "text-base",
        label: "text-xl",
      },
      xl: {
        wrapper: "w-16 h-9 mr-2",
        thumb: [
          "w-7 h-7 text-lg",
          //checked
          "group-data-[checked=true]:ml-7",
          // pressed
          "group-data-[pressed=true]:w-8",
          "group-data-[checked]:group-data-[pressed]:ml-6",
        ],
        endIcon: "text-base",
        startIcon: "text-base",
        label: "text-xl",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    disableAnimation: {
      true: {
        wrapper: "transition-none",
        thumb: "transition-none",
      },
      false: {
        wrapper: "transition-background",
        thumb: "transition-all",
        startIcon: [
          "opacity-0",
          "scale-50",
          "transition-transform-opacity",
          "group-data-[checked=true]:scale-100",
          "group-data-[checked=true]:opacity-100",
        ],
        endIcon: [
          "opacity-100",
          "transition-transform-opacity",
          "group-data-[checked=true]:translate-x-3",
          "group-data-[checked=true]:opacity-0",
        ],
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ToggleVariantProps = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export {toggle};
