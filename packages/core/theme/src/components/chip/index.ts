import {tv, type VariantProps} from "tailwind-variants";

/**
 * Chip wrapper **Tailwind Variants** component
 *
 * const styles = chip({...})
 *
 * @example
 * <div className={styles)}>
 *   Default
 * </div>
 */
const chip = tv({
  base: [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "box-border",
    "font-medium",
    "select-none",
    "gap-3",
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
      neutral: [
        "bg-neutral-300",
        "dark:bg-neutral-700",
        "text-neutral-800",
        "dark:text-neutral-100",
      ],
      primary: ["bg-primary", "text-white", "data-[status=checked]:bg-primary-600"],
      secondary: ["bg-secondary", "text-white", "data-[status=checked]:bg-secondary-600"],
      success: ["bg-success", "text-success-800", "data-[status=checked]:bg-success-600"],
      warning: ["bg-warning", "text-warning-800", "data-[status=checked]:bg-warning-600"],
      danger: ["bg-danger", "text-white", "data-[status=checked]:bg-danger-600"],
    },
    size: {
      xs: "px-1 h-5 text-xs",
      sm: "px-2 h-6 text-sm",
      md: "px-3 h-7 text-base",
      lg: "px-4 h-8 text-lg",
      xl: "px-5 h-9 text-xl",
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
    isDisabled: {
      true: "opacity-50 pointer-events-none",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "neutral",
    size: "md",
    radius: "full",
    fullWidth: false,
    isDisabled: false,
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
  ],
});

export type ChipVariantProps = VariantProps<typeof chip>;

export {chip};
