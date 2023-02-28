import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses, colorVariants} from "../../utils";

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
      faded: "border-2",
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
      neutral: colorVariants.solid.neutral,
      primary: colorVariants.solid.primary,
      secondary: colorVariants.solid.secondary,
      success: colorVariants.solid.success,
      warning: colorVariants.solid.warning,
      danger: colorVariants.solid.danger,
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
    isInGroup: {
      true: "[&:not(:first-child):not(:last-child)]:rounded-none",
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
    isInGroup: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // shadow / color
    {
      variant: "shadow",
      color: "neutral",
      class: colorVariants.shadow.neutral,
    },
    {
      variant: "shadow",
      color: "primary",
      class: colorVariants.shadow.primary,
    },
    {
      variant: "shadow",
      color: "secondary",
      class: colorVariants.shadow.secondary,
    },
    {
      variant: "shadow",
      color: "success",
      class: colorVariants.shadow.success,
    },
    {
      variant: "shadow",
      color: "warning",
      class: colorVariants.shadow.warning,
    },
    {
      variant: "shadow",
      color: "danger",
      class: colorVariants.shadow.danger,
    },
    // bordered / color
    {
      variant: "bordered",
      color: "neutral",
      class: colorVariants.bordered.neutral,
    },
    {
      variant: "bordered",
      color: "primary",
      class: colorVariants.bordered.primary,
    },
    {
      variant: "bordered",
      color: "secondary",
      class: colorVariants.bordered.secondary,
    },
    {
      variant: "bordered",
      color: "success",
      class: colorVariants.bordered.success,
    },
    {
      variant: "bordered",
      color: "warning",
      class: colorVariants.bordered.warning,
    },
    {
      variant: "bordered",
      color: "danger",
      class: colorVariants.bordered.danger,
    },
    // flat / color
    {
      variant: "flat",
      color: "neutral",
      class: colorVariants.flat.neutral,
    },
    {
      variant: "flat",
      color: "primary",
      class: colorVariants.flat.primary,
    },
    {
      variant: "flat",
      color: "secondary",
      class: colorVariants.flat.secondary,
    },
    {
      variant: "flat",
      color: "success",
      class: colorVariants.flat.success,
    },
    {
      variant: "flat",
      color: "warning",
      class: colorVariants.flat.warning,
    },
    {
      variant: "flat",
      color: "danger",
      class: colorVariants.flat.danger,
    },
    // faded / color
    {
      variant: "faded",
      color: "neutral",
      class: colorVariants.faded.neutral,
    },
    {
      variant: "faded",
      color: "primary",
      class: colorVariants.faded.primary,
    },
    {
      variant: "faded",
      color: "secondary",
      class: colorVariants.faded.secondary,
    },
    {
      variant: "faded",
      color: "success",
      class: colorVariants.faded.success,
    },
    {
      variant: "faded",
      color: "warning",
      class: colorVariants.faded.warning,
    },
    {
      variant: "faded",
      color: "danger",
      class: colorVariants.faded.danger,
    },
    // light / color
    {
      variant: "light",
      color: "neutral",
      class: colorVariants.light.neutral,
    },
    {
      variant: "light",
      color: "primary",
      class: colorVariants.light.primary,
    },
    {
      variant: "light",
      color: "secondary",
      class: colorVariants.light.secondary,
    },
    {
      variant: "light",
      color: "success",
      class: colorVariants.light.success,
    },
    {
      variant: "light",
      color: "warning",
      class: colorVariants.light.warning,
    },
    {
      variant: "light",
      color: "danger",
      class: colorVariants.light.danger,
    },
    // ghost / color
    {
      variant: "ghost",
      color: "neutral",
      class: colorVariants.ghost.neutral,
    },
    {
      variant: "ghost",
      color: "primary",
      class: colorVariants.ghost.primary,
    },
    {
      variant: "ghost",
      color: "secondary",
      class: colorVariants.ghost.secondary,
    },
    {
      variant: "ghost",
      color: "success",
      class: colorVariants.ghost.success,
    },
    {
      variant: "ghost",
      color: "warning",
      class: colorVariants.ghost.warning,
    },
    {
      variant: "ghost",
      color: "danger",
      class: colorVariants.ghost.danger,
    },
    // !disabledAnimation / ghost
    {
      variant: "ghost",
      disableAnimation: false,
      class: "transition-[transform,background]",
    },
    // isInGroup / radius
    {
      isInGroup: true,
      radius: "base",
      class: "rounded-none  first:rounded-l last:rounded-r",
    },
    {
      isInGroup: true,
      radius: "sm",
      class: "rounded-none  first:rounded-l-sm last:rounded-r-sm",
    },
    {
      isInGroup: true,
      radius: "md",
      class: "rounded-none  first:rounded-l-md last:rounded-r-md",
    },
    {
      isInGroup: true,
      radius: "lg",
      class: "rounded-none  first:rounded-l-lg last:rounded-r-lg",
    },
    {
      isInGroup: true,
      radius: "xl",
      class: "rounded-none  first:rounded-l-xl last:rounded-r-xl",
    },
    {
      isInGroup: true,
      radius: "2xl",
      class: "rounded-none  first:rounded-l-2xl last:rounded-r-2xl",
    },
    {
      isInGroup: true,
      radius: "3xl",
      class: "rounded-none  first:rounded-l-3xl last:rounded-r-3xl",
    },
    {
      isInGroup: true,
      radius: "full",
      class: "rounded-none  first:rounded-l-full last:rounded-r-full",
    },
    // isInGroup / bordered
    {
      isInGroup: true,
      variant: "bordered",
      class: "[&:not(:first-child)]:border-l-0",
    },
  ],
});

export type ButtonVariantProps = VariantProps<typeof button>;

export {button};
