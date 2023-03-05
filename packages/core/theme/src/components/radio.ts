import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * Radio wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, point, label, description} = radio({...})
 *
 * @example
 * <label className={base())}>
 *  // input
 *  <span className={wrapper()} aria-hidden="true" data-checked={checked}>
 *     <span className={point()}/>
 *  </span>
 *  <span className={label()}>Label</span>
 *  <span className={description()}>Description</span>
 * </label>
 */
const radio = tv({
  slots: {
    base: "relative max-w-fit inline-flex items-center justify-start cursor-pointer",
    wrapper: "",
    point: "",
    label: "relative ml-1 text-foreground select-none",
    description: "relative ml-1 text-neutral-500 select-none",
  },
  variants: {
    color: {
      neutral: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
    radius: {
      none: {},
      base: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      full: {},
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isFocusVisible: {
      true: {
        wrapper: [...ringClasses],
      },
    },
    disableAnimation: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    radius: "md",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioSlots = keyof ReturnType<typeof radio>;

export {radio};
