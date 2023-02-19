import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../../utils";

/**
 * Button wrapper **Tailwind Variants** component
 *
 * const styles = button({...})
 *
 * @example
 * <button className={styles())}>
 *   Button
 * </button>
 */
const button = tv({
  base: [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "box-border",
    "apparance-none",
    "outline-none",
    "select-none",
    "font-medium",
    "antialiased",
    "active:scale-95",
    "overflow-hidden",
    "gap-3",
  ],
  variants: {
    variant: {
      solid: "",
      bordered: "border-2 !bg-transparent",
      light: "!bg-transparent",
      flat: "",
      shadow: "",
      ghost: "border-2 !bg-transparent",
    },
    size: {
      xs: "px-2 h-6 text-xs",
      sm: "px-3 h-8 text-sm",
      md: "px-4 h-10 text-base",
      lg: "px-6 h-12 text-md",
      xl: "px-8 h-14 text-lg",
    },
    color: {
      neutral: "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100",
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      success: "bg-success text-success-800",
      warning: "bg-warning text-warning-800",
      danger: "bg-danger text-white",
    },
    radius: {
      none: "rounded-none",
      base: "rounded",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    fullWidth: {
      true: "w-full",
    },
    isDisabled: {
      true: "opacity-50 pointer-events-none",
    },
    isFocusVisible: {
      true: [...ringClasses],
    },
    disableAnimation: {
      false: "transition-transform",
      true: "!transition-none",
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
      class: "shadow-lg shadow-neutral/40",
    },
    {
      variant: "shadow",
      color: "primary",
      class: "shadow-lg shadow-primary/40",
    },
    {
      variant: "shadow",
      color: "secondary",
      class: "shadow-lg shadow-secondary/40",
    },
    {
      variant: "shadow",
      color: "success",
      class: "shadow-lg shadow-success/40",
    },
    {
      variant: "shadow",
      color: "warning",
      class: "shadow-lg shadow-warning/40",
    },
    {
      variant: "shadow",
      color: "danger",
      class: "shadow-lg shadow-danger/40",
    },
    // bordered / color
    {
      variant: "bordered",
      color: "neutral",
      class: "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100",
    },
    {
      variant: "bordered",
      color: "primary",
      class: "border-primary text-primary",
    },
    {
      variant: "bordered",
      color: "secondary",
      class: "border-secondary text-secondary",
    },
    {
      variant: "bordered",
      color: "success",
      class: "border-success text-success",
    },
    {
      variant: "bordered",
      color: "warning",
      class: "border-warning text-warning",
    },
    {
      variant: "bordered",
      color: "danger",
      class: "border-danger text-danger",
    },
    // flat / color
    {
      variant: "flat",
      color: "neutral",
      class: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-100",
    },
    {
      variant: "flat",
      color: "primary",
      class: "bg-primary-50 dark:bg-primary-900 text-primary",
    },
    {
      variant: "flat",
      color: "secondary",
      class: "bg-secondary-50 dark:bg-secondary-900 text-secondary dark:text-secondary-400",
    },
    {
      variant: "flat",
      color: "success",
      class: "bg-success-50 dark:bg-success-900 text-success-600 dark:text-success",
    },
    {
      variant: "flat",
      color: "warning",
      class: "bg-warning-50 dark:bg-warning-900 text-warning-600 dark:text-warning",
    },
    {
      variant: "flat",
      color: "danger",
      class: "bg-danger-50 dark:bg-danger-900 text-danger dark:text-danger-400",
    },
    // light / color
    {
      variant: "light",
      color: "neutral",
      class: "text-neutral-700 dark:text-neutral-100",
    },
    {
      variant: "light",
      color: "primary",
      class: "text-primary",
    },
    {
      variant: "light",
      color: "secondary",
      class: "text-secondary",
    },
    {
      variant: "light",
      color: "success",
      class: "text-success",
    },
    {
      variant: "light",
      color: "warning",
      class: "text-warning",
    },
    {
      variant: "light",
      color: "danger",
      class: "text-danger",
    },
    // ghost / color
    {
      variant: "ghost",
      color: "neutral",
      class: "border-neutral-300 dark:border-neutral-700 hover:!bg-neutral-300",
    },
    {
      variant: "ghost",
      color: "primary",
      class: "border-primary text-primary hover:text-white hover:!bg-primary",
    },
    {
      variant: "ghost",
      color: "secondary",
      class: "border-secondary text-secondary hover:text-white hover:!bg-secondary",
    },
    {
      variant: "ghost",
      color: "success",
      class: "border-success text-success hover:text-white hover:!bg-success",
    },
    {
      variant: "ghost",
      color: "warning",
      class: "border-warning text-warning hover:text-white hover:!bg-warning",
    },
    {
      variant: "ghost",
      color: "danger",
      class: "border-danger text-danger hover:text-white hover:!bg-danger",
    },
    // !disabledAnimation / ghost
    {
      variant: "ghost",
      disableAnimation: false,
      class: "transition-[transform,background]",
    },
  ],
});

export type ButtonVariantProps = VariantProps<typeof button>;

export {button};
