import {tv, type VariantProps} from "tailwind-variants";

import {colorVariants} from "../utils";
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
      faded: "border-2",
      flat: "",
      shadow: "",
    },
    color: {
      neutral: colorVariants.solid.neutral,
      foreground: colorVariants.solid.foreground,
      primary: colorVariants.solid.primary,
      secondary: colorVariants.solid.secondary,
      success: colorVariants.solid.success,
      warning: colorVariants.solid.warning,
      danger: colorVariants.solid.danger,
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
      class: colorVariants.shadow.neutral,
    },
    {
      variant: "shadow",
      color: "foreground",
      class: colorVariants.shadow.foreground,
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
      color: "foreground",
      class: colorVariants.bordered.foreground,
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
      color: "foreground",
      class: colorVariants.flat.foreground,
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
      color: "foreground",
      class: colorVariants.faded.foreground,
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
      color: "foreground",
      class: colorVariants.light.foreground,
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
    // size (xs) / bordered
    {
      size: "xs",
      variant: "bordered",
      class: "border-1.5",
    },
  ],
});

export type TooltipVariantProps = VariantProps<typeof tooltip>;
export type TooltipSlots = keyof ReturnType<typeof tooltip>;

export {tooltip};
