import {tv, type VariantProps} from "tailwind-variants";

import {colorVariants} from "../utils";

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
      neutral: colorVariants.flat.neutral,
      primary: colorVariants.flat.primary,
      secondary: colorVariants.flat.secondary,
      success: colorVariants.flat.success,
      warning: colorVariants.flat.warning,
      danger: colorVariants.flat.danger,
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
