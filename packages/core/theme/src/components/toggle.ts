import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * Toggle (Switch) wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, thumb, thumbIcon, label, startIcon, endIcon} = toggle({...})
 *
 * @example
 * <label className={base())}>
 *  // hidden input
 *  <span className={wrapper()} aria-hidden="true" data-checked={checked}>
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
    base: "relative max-w-fit inline-flex items-center justify-start cursor-pointer",
    wrapper: [
      "group",
      "px-1",
      "relative",
      "inline-flex",
      "items-center",
      "justify-start",
      "flex-shrink-0",
      "overflow-hidden",
      "bg-neutral-200",
      "rounded-full",
    ],
    thumb: [
      "z-10",
      "flex",
      "items-center",
      "justify-center",
      "bg-white",
      "shadow-sm",
      "rounded-full",
      "data-[checked=true]:translate-x-full",
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
          "data-[checked=true]:bg-neutral-400",
          "data-[checked=true]:text-neutral-contrastText",
        ],
      },
      primary: {
        wrapper: [
          "data-[checked=true]:bg-primary",
          "data-[checked=true]:text-primary-contrastText",
        ],
      },
      secondary: {
        wrapper: [
          "data-[checked=true]:bg-secondary",
          "data-[checked=true]:text-secondary-contrastText",
        ],
      },
      success: {
        wrapper: [
          "data-[checked=true]:bg-success",
          "data-[checked=true]:text-success-contrastText",
        ],
      },
      warning: {
        wrapper: [
          "data-[checked=true]:bg-warning",
          "data-[checked=true]:text-warning-contrastText",
        ],
      },
      danger: {
        wrapper: ["data-[checked=true]:bg-danger", "data-[checked=true]:text-danger-contrastText"],
      },
    },
    size: {
      xs: {
        wrapper: "px-0.5 w-7 h-4 mr-1",
        thumb: "w-3 h-3 text-[0.5rem]",
        startIcon: "text-[0.5rem] left-1",
        endIcon: "text-[0.5rem] right-1",
        right: "text-[0.5rem]",
        label: "text-xs",
      },
      sm: {
        wrapper: "w-8 h-5 mr-1",
        thumb: "w-3 h-3 text-[0.6rem]",
        startIcon: "text-[0.6rem] left-1",
        endIcon: "text-[0.6rem] right-1",
        label: "text-sm",
      },
      md: {
        wrapper: "w-10 h-6 mr-2",
        thumb: "w-4 h-4 text-xs",
        endIcon: "text-xs",
        startIcon: "text-xs",
        label: "text-base",
      },
      lg: {
        wrapper: "w-12 h-7 mr-2",
        thumb: "w-5 h-5 text-sm",
        endIcon: "text-sm",
        startIcon: "text-sm",
        label: "text-lg",
      },
      xl: {
        wrapper: "w-14 h-8 mr-2",
        thumb: "w-6 h-6 text-base",
        endIcon: "text-base",
        startIcon: "text-base",
        label: "text-xl",
      },
    },
    isFocusVisible: {
      true: {
        wrapper: [...ringClasses],
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
        thumb: "transition-transform !ease-soft-spring !duration-500",
        startIcon: [
          "opacity-0",
          "scale-50",
          "transition-transform-opacity",
          "data-[checked=true]:scale-100",
          "data-[checked=true]:opacity-100",
        ],
        endIcon: [
          "opacity-100",
          "transition-transform-opacity",
          "data-[checked=true]:translate-x-3",
          "data-[checked=true]:opacity-0",
        ],
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "lg",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ToggleVariantProps = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export {toggle};
