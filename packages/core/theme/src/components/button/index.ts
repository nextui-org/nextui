import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../../utils";

/**
 * Button wrapper **Tailwind Variants** component
 *
 * const {base, icon} = button({...})
 *
 * @example
 * <button className={base())}>
 *   <span className={icon()} aria-hidden="true" focusable="false" >
 *     <svg>your left icon</svg>
 *   </span>
 *    Button text
 *    <span className={icon()} aria-hidden="true" focusable="false" >
 *      <svg>your right icon</svg>
 *    </span>
 * </button>
 */
const button = tv({
  slots: {
    base: [
      "inline-flex",
      "items-center",
      "justify-center",
      "box-border",
      "apparance-none",
      "outline-none",
      "user-select-none",
      "font-medium",
    ],
    icon: "",
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        base: "border-2 !bg-transparent",
      },
      light: {
        base: "!bg-transparent",
      },
      flat: {},
      shadow: {},
      ghost: {
        base: "transition-background border-2 !bg-transparent",
      },
    },
    size: {
      xs: {
        base: "px-2 h-6 text-xs",
      },
      sm: {
        base: "px-3 h-8 text-sm",
      },
      md: {
        base: "px-4 h-10 text-base",
      },
      lg: {
        base: "px-6 h-12 text-md",
      },
      xl: {
        base: "px-8 h-14 text-lg",
      },
    },
    color: {
      neutral: {
        base: "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100",
      },
      primary: {
        base: "bg-primary text-white",
      },
      secondary: {
        base: "bg-secondary text-white",
      },
      success: {
        base: "bg-success text-success-800",
      },
      warning: {
        base: "bg-warning text-warning-800",
      },
      danger: {
        base: "bg-danger text-white",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      base: {
        base: "rounded",
      },
      sm: {
        base: "rounded-sm",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
      xl: {
        base: "rounded-xl",
      },
      "2xl": {
        base: "rounded-2xl",
      },
      "3xl": {
        base: "rounded-3xl",
      },
      full: {
        base: "rounded-full",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isFocusVisible: {
      true: {
        base: [...ringClasses],
      },
    },
    disableAnimation: {
      true: {
        base: "!transition-none",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "neutral",
    radius: "xl",
    fullWidth: false,
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // shadow / color
    {
      variant: "shadow",
      color: "neutral",
      class: {
        base: "shadow-lg shadow-neutral/40",
      },
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: "shadow-lg shadow-primary/40",
      },
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: "shadow-lg shadow-secondary/40",
      },
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: "shadow-lg shadow-success/40",
      },
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: "shadow-lg shadow-warning/40",
      },
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: "shadow-lg shadow-danger/40",
      },
    },
    // bordered / color
    {
      variant: "bordered",
      color: "neutral",
      class: {
        base: "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "border-primary text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "border-secondary text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "border-success text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "border-warning text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "border-danger text-danger",
      },
    },
    // flat / color
    {
      variant: "flat",
      color: "neutral",
      class: {
        base: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-100",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-50 dark:bg-primary-900 text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-50 dark:bg-secondary-900 text-secondary dark:text-secondary-400",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-success-50 dark:bg-success-900 text-success-600 dark:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-warning-50 dark:bg-warning-900 text-warning-600 dark:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "bg-danger-50 dark:bg-danger-900 text-danger dark:text-danger-400",
      },
    },
    // light / color
    {
      variant: "light",
      color: "neutral",
      class: {
        base: "text-neutral-700 dark:text-neutral-100",
      },
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: "text-primary",
      },
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: "text-secondary",
      },
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: "text-success",
      },
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: "text-warning",
      },
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: "text-danger",
      },
    },
    // ghost / color
    {
      variant: "ghost",
      color: "neutral",
      class: {
        base: "border-neutral-300 dark:border-neutral-700 hover:!bg-neutral-300",
      },
    },
    {
      variant: "ghost",
      color: "primary",
      class: {
        base: "border-primary text-primary hover:text-white hover:!bg-primary",
      },
    },
    {
      variant: "ghost",
      color: "secondary",
      class: {
        base: "border-secondary text-secondary hover:text-white hover:!bg-secondary",
      },
    },
    {
      variant: "ghost",
      color: "success",
      class: {
        base: "border-success text-success hover:text-white hover:!bg-success",
      },
    },
    {
      variant: "ghost",
      color: "warning",
      class: {
        base: "border-warning text-warning hover:text-white hover:!bg-warning",
      },
    },
    {
      variant: "ghost",
      color: "danger",
      class: {
        base: "border-danger text-danger hover:text-white hover:!bg-danger",
      },
    },
  ],
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;

export {button};
