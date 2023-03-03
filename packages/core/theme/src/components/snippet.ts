import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses, colorVariants} from "../utils";

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
      bordered: "border-1.5 !bg-transparent",
      shadow: "",
    },
    color: {
      neutral: {
        base: colorVariants.flat.neutral,
      },
      primary: {
        base: colorVariants.flat.primary,
      },
      secondary: {
        base: colorVariants.flat.secondary,
      },
      success: {
        base: colorVariants.flat.success,
      },
      warning: {
        base: colorVariants.flat.warning,
      },
      danger: {
        base: colorVariants.flat.danger,
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
      variant: "solid",
      color: "neutral",
      class: {
        base: colorVariants.solid.neutral,
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary,
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary,
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success,
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning,
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger,
      },
    },
    // shadow / color
    {
      variant: "shadow",
      color: "neutral",
      class: {
        base: colorVariants.shadow.neutral,
      },
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: colorVariants.shadow.primary,
      },
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: colorVariants.shadow.secondary,
      },
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: colorVariants.shadow.success,
      },
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: colorVariants.shadow.warning,
      },
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: colorVariants.shadow.danger,
      },
    },
    // bordered / color
    {
      variant: "bordered",
      color: "neutral",
      class: {
        base: colorVariants.bordered.neutral,
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: colorVariants.bordered.primary,
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: colorVariants.bordered.secondary,
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: colorVariants.bordered.success,
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: colorVariants.bordered.warning,
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: colorVariants.bordered.danger,
      },
    },
  ],
});

export type SnippetVariantProps = VariantProps<typeof snippet>;
export type SnippetSlots = keyof ReturnType<typeof snippet>;

export {snippet};
