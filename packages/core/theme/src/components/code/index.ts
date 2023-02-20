import {tv, type VariantProps} from "tailwind-variants";

/**
 * Code wrapper **Tailwind Variants** component
 *
 * const styles = code({...})
 *
 * @example
 * <code className={styles)}>
 *   npm install @nextui-org/react
 * </code>
 */
const code = tv({
  base: ["px-2", "py-1", "font-mono", "whitespace-pre-wrap"],
  variants: {
    color: {
      neutral: "text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-800",
      primary: "bg-primary-50 dark:bg-primary-900 text-primary",
      secondary: "bg-secondary-50 dark:bg-secondary-900 text-secondary dark:text-secondary-400",
      success: "bg-success-50 dark:bg-success-900 text-success-600 dark:text-success",
      warning: "bg-warning-50 dark:bg-warning-900 text-warning-600 dark:text-warning",
      danger: "bg-danger-50 dark:bg-danger-900 text-danger",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    radius: {
      none: "rounded-none",
      base: "rounded-base",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    color: "neutral",
    size: "sm",
    radius: "lg",
  },
});

export type CodeVariantProps = VariantProps<typeof code>;

export {code};
