import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * Radio wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, point, labelWrapper, label, description} = radio({...})
 *
 * @example
 * <label className={base())}>
 *  // input
 *  <span className={wrapper()} aria-hidden="true" data-checked={checked} data-hover-unchecked={hoverUnchecked}>
 *     <span className={point()}/>
 *  </span>
 *  <div className={labelWrapper()}>
 *    <span className={label()}>Label</span>
 *    <span className={description()}>Description</span>
 *  </div>
 * </label>
 */
const radio = tv({
  slots: {
    base: "relative max-w-fit inline-flex items-center justify-start cursor-pointer",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "flex-shrink-0",
      "overflow-hidden",
      "border-solid",
      "border-2",
      "box-border",
      "border-neutral",
      "data-[hover-unchecked=true]:bg-neutral-100",
    ],
    labelWrapper: "flex flex-col ml-1",
    control: [
      "z-10",
      "w-2",
      "h-2",
      "opacity-0",
      "scale-0",
      "origin-center",
      "data-[checked=true]:opacity-100",
      "data-[checked=true]:scale-100",
    ],
    label: "relative text-foreground select-none",
    description: "relative text-neutral-400",
  },
  variants: {
    color: {
      neutral: {
        control: "bg-neutral-500 text-neutral-contrastText",
        wrapper: "data-[checked=true]:border-neutral-500",
      },
      primary: {
        control: "bg-primary text-primary-contrastText",
        wrapper: "data-[checked=true]:border-primary",
      },
      secondary: {
        control: "bg-secondary text-secondary-contrastText",
        wrapper: "data-[checked=true]:border-secondary",
      },
      success: {
        control: "bg-success text-success-contrastText",
        wrapper: "data-[checked=true]:border-success",
      },
      warning: {
        control: "bg-warning text-warning-contrastText",
        wrapper: "data-[checked=true]:border-warning",
      },
      danger: {
        control: "bg-danger text-danger-contrastText",
        wrapper: "data-[checked=true]:border-danger",
      },
    },
    size: {
      xs: {
        wrapper: "w-3.5 h-3.5",
        control: "w-1 h-1",
        labelWrapper: "ml-1",
        label: "text-xs",
        description: "text-xs",
      },
      sm: {
        wrapper: "w-4 h-4",
        control: "w-1.5 h-1.5",
        labelWrapper: "ml-1",
        label: "text-sm",
        description: "text-xs",
      },
      md: {
        wrapper: "w-5 h-5",
        control: "w-2 h-2",
        labelWrapper: "ml-2",
        label: "text-base",
        description: "text-sm",
      },
      lg: {
        wrapper: "w-6 h-6",
        control: "w-2.5 h-2.5",
        labelWrapper: "ml-2",
        label: "text-lg",
        description: "text-base",
      },
      xl: {
        wrapper: "w-7 h-7",
        control: "w-3 h-3",
        labelWrapper: "ml-3",
        label: "text-xl",
        description: "text-lg",
      },
    },
    radius: {
      none: {
        wrapper: "rounded-none",
        control: "rounded-none",
      },
      base: {
        wrapper: "rounded",
        control: "rounded",
      },
      sm: {
        wrapper: "rounded-sm",
        control: "rounded-sm",
      },
      md: {
        wrapper: "rounded-md",
        control: "rounded-sm",
      },
      lg: {
        wrapper: "rounded-lg",
        control: "rounded",
      },
      xl: {
        wrapper: "rounded-xl",
        control: "rounded-md",
      },
      full: {
        wrapper: "rounded-full",
        control: "rounded-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        control: "bg-danger text-danger-contrastText",
        wrapper: "border-danger data-[checked=true]:border-danger",
        label: "text-danger",
        description: "text-danger-300",
      },
    },
    isFocusVisible: {
      true: {
        wrapper: [...ringClasses],
      },
    },
    disableAnimation: {
      true: {},
      false: {
        wrapper: "transition-background",
        control: "transition-transform-opacity",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    radius: "full",
    isDisabled: false,
    isInvalid: false,
    disableAnimation: false,
  },
});

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioSlots = keyof ReturnType<typeof radio>;

export {radio};
