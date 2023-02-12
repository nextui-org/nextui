import {tv, type VariantProps} from "tailwind-variants";

import {focusVisibleClasses} from "../../utils";

/**
 * Link **Tailwind Variants** component
 *
 * @example
 * <a className={link({ color: "secondary", isBlock: true })} href="#" />
 */
const link = tv({
  base: focusVisibleClasses,
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    color: {
      foreground: "text-foreground dark:text-foreground-dark",
      primary: "text-primary",
      secondary: "text-secondary dark:text-secondary-dark",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    },
    isUnderline: {
      true: "hover:underline active:underline focus:underline underline-offset-4",
      false: "no-underline",
    },
    isBlock: {
      true: "px-2 py-1 hover:after:opacity-100 after:content-[' '] after:inset-0 after:opacity-0 after:w-full after:h-full after:rounded-xl after:transition-background after:absolute",
      false: "hover:opacity-80 transition-opacity",
    },
    isDisabled: {
      true: "opacity-50 cursor-default pointer-events-none",
    },
    disableAnimation: {
      true: "after:transition-none transition-none",
    },
  },
  compoundVariants: [
    {
      isBlock: true,
      color: "foreground",
      class: "hover:after:bg-foreground/25 dark:hover:after:bg-foreground-dark/25",
    },
    {
      isBlock: true,
      color: "primary",
      class: "hover:after:bg-primary/25",
    },
    {
      isBlock: true,
      color: "secondary",
      class: "hover:after:bg-secondary/25 dark:hover:after:bg-secondary-dark/25",
    },
    {
      isBlock: true,
      color: "success",
      class: "hover:after:bg-success/25",
    },
    {
      isBlock: true,
      color: "warning",
      class: "hover:after:bg-warning/25",
    },
    {
      isBlock: true,
      color: "error",
      class: "hover:after:bg-error/25",
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    isBlock: false,
    isUnderline: false,
    disableAnimation: false,
  },
});

export type LinkVariantProps = VariantProps<typeof link>;

export {link};
