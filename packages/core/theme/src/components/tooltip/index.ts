import {tv, type VariantProps} from "tailwind-variants";

/**
 * Tooltip wrapper **Tailwind Variants** component
 *
 * const styles = tooltip({...})
 *
 * @example
 * <div>
 *  <button>your trigger</button>
 *  <div role="tooltip" className={styles} data-transition='enter/leave'>
 *    // tooltip content
 *  </div>
 * </div>
 */
const tooltip = tv({
  base: [
    "inline-flex",
    "flex-col",
    "items-center",
    "justify-center",
    "box-border",
    "animate-appearance-in",
    "data-[transition=leave]:animate-appearance-out",
  ],
  variants: {
    variant: {
      solid: "",
      bordered: "border-2 !bg-transparent",
      light: "!bg-transparent",
      flat: "",
      shadow: "",
    },
    color: {
      neutral: "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100",
      foreground: "bg-foreground text-foreground-dark dark:text-foreground-light",
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      success: "bg-success text-success-800",
      warning: "bg-warning text-warning-800",
      danger: "bg-danger text-white",
    },
    size: {
      xs: "px-2 h-4 text-xs",
      sm: "px-3 h-6 text-sm",
      md: "px-4 h-8 text-base",
      lg: "px-6 h-10 text-lg",
      xl: "px-8 h-12 text-xl",
    },
    radius: {
      none: "rounded-none",
      base: "rounded",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    disableAnimation: {
      true: "animate-none",
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "neutral",
    size: "sm",
    radius: "lg",
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
      color: "foreground",
      class: "shadow-lg shadow-foreground/40",
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
      color: "foreground",
      class: "border-foreground text-foreground dark:text-foreground-dark",
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
      color: "foreground",
      class:
        "bg-foreground/20 text-foreground dark:bg-foreground-dark/20 dark:text-foreground-dark",
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
      color: "foreground",
      class: "text-foreground dark:text-foreground-dark",
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
  ],
});

export type TooltipVariantProps = VariantProps<typeof tooltip>;
export type TooltipSlots = keyof ReturnType<typeof tooltip>;

export {tooltip};
