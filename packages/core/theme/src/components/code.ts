import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {colorVariants} from "../utils";

/**
 * Code wrapper **Tailwind Variants** component
 *
 * const classNames = code({...})
 *
 * @example
 * <code className={classNames)}>
 *   npm install @nextui-org/react
 * </code>
 */
const code = tv({
  base: ["px-2", "py-1", "h-fit", "font-mono", "font-normal", "inline-block", "whitespace-nowrap"],
  variants: {
    color: {
      default: colorVariants.flat.default,
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
    color: "default",
    size: "sm",
    radius: "lg",
  },
});

export type CodeVariantProps = VariantProps<typeof code>;

export {code};
