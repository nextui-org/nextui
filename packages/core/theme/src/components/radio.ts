import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Radio wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, point, labelWrapper, label, description} = radio({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-checked={boolean}
 *    data-hover-unchecked={boolean}
 *    data-focus-visible={boolean}
 * >
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
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer",
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
      "border-default",
      "group-data-[hover-unchecked=true]:bg-default-100",
      // focus ring
      "group-data-[focus-visible=true]:outline-none",
      "group-data-[focus-visible=true]:ring-2",
      "group-data-[focus-visible=true]:!ring-primary",
      "group-data-[focus-visible=true]:ring-offset-2",
      "group-data-[focus-visible=true]:ring-offset-background",
      "group-data-[focus-visible=true]:dark:ring-offset-background-dark",
    ],
    labelWrapper: "flex flex-col ml-1",
    control: [
      "z-10",
      "w-2",
      "h-2",
      "opacity-0",
      "scale-0",
      "origin-center",
      "group-data-[checked=true]:opacity-100",
      "group-data-[checked=true]:scale-100",
    ],
    label: "relative text-foreground select-none",
    description: "relative text-default-400",
  },
  variants: {
    color: {
      default: {
        control: "bg-default-500 text-default-foreground",
        wrapper: "group-data-[checked=true]:border-default-500",
      },
      primary: {
        control: "bg-primary text-primary-foreground",
        wrapper: "group-data-[checked=true]:border-primary",
      },
      secondary: {
        control: "bg-secondary text-secondary-foreground",
        wrapper: "group-data-[checked=true]:border-secondary",
      },
      success: {
        control: "bg-success text-success-foreground",
        wrapper: "group-data-[checked=true]:border-success",
      },
      warning: {
        control: "bg-warning text-warning-foreground",
        wrapper: "group-data-[checked=true]:border-warning",
      },
      danger: {
        control: "bg-danger text-danger-foreground",
        wrapper: "group-data-[checked=true]:border-danger",
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
        control: "bg-danger text-danger-foreground",
        wrapper: "border-danger data-[checked=true]:border-danger",
        label: "text-danger",
        description: "text-danger-300",
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

/**
 * RadioGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper} = radioGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // radios
 *  </div>
 * </div>
 */
const radioGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-default-500",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row ",
  },
});

export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>;

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioSlots = keyof ReturnType<typeof radio>;

export {radio, radioGroup};
