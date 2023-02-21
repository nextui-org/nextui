import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../../utils";

/**
 * Snippet wrapper **Tailwind Variants** component
 *
 * const {base, pre, copy} = snippet({...})
 *
 * @example
 * <div className={base())}>
 *   <pre className={pre()}>
 *      // code snippet
 *   </pre>
 *   <button className={copy()}>
 *    <svg>
 *    // copy icon
 *    </svg>
 *  </button>
 * </div>
 */
const snippet = tv({
  slots: {
    base: "inline-flex items-center justify-between space-x-3 rounded-md",
    pre: "bg-transparent text-inherit font-mono whitespace-pre-wrap",
    copy: "z-10 apparance-none outline-none select-none",
  },
  variants: {
    variant: {
      flat: "",
      solid: "",
      bordered: "border-2 !bg-transparent",
      shadow: "",
    },
    color: {
      neutral: {
        base: "text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-800",
      },
      primary: {
        base: "bg-primary-50 dark:bg-primary-900 text-primary",
      },
      secondary: {
        base: "bg-secondary-50 dark:bg-secondary-900 text-secondary dark:text-secondary-400",
      },
      success: {
        base: "bg-success-50 dark:bg-success-900 text-success-600 dark:text-success",
      },
      warning: {
        base: "bg-warning-50 dark:bg-warning-900 text-warning-600 dark:text-warning",
      },
      danger: {
        base: "bg-danger-50 dark:bg-danger-900 text-danger",
      },
    },
    size: {
      xs: {
        base: "px-2 py-1 text-xs",
      },
      sm: {
        base: "px-2 py-1 text-sm",
      },
      md: {
        base: "px-3 py-1.5 text-base",
      },
      lg: {
        base: "px-4 py-2 text-lg",
      },
      xl: {
        base: "px-4 py-2 text-xl",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      base: {
        base: "rounded-base",
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
      full: {
        base: "rounded-full",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isFocusVisible: {
      true: {
        copy: [
          ...ringClasses,
          "ring-1",
          "rounded-sm",
          "ring-offset-transparent",
          "dark:ring-offset-transparent",
        ],
      },
    },
  },
  defaultVariants: {
    color: "neutral",
    variant: "flat",
    size: "md",
    radius: "lg",
    fullWidth: false,
    isFocusVisible: false,
  },
  compoundVariants: [
    // solid & shadow / color
    {
      variant: ["solid", "shadow"],
      color: "neutral",
      class: {
        base: "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "primary",
      class: {
        base: "bg-primary text-white",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "secondary",
      class: {
        base: "bg-secondary text-white",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "success",
      class: {
        base: "bg-success text-success-800",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "warning",
      class: {
        base: "bg-warning text-warning-800",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "danger",
      class: {
        base: "bg-danger text-white",
      },
    },
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
  ],
});

export type SnippetVariantProps = VariantProps<typeof snippet>;
export type SnippetSlots = keyof ReturnType<typeof snippet>;

export {snippet};
