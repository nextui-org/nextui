import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {colorVariants} from "../utils";

/**
 * Button wrapper **Tailwind Variants** component
 *
 * const classNames = button({...})
 *
 * @example
 * <button
 *  className={classNames())}
 *  data-pressed={true/false}
 *  data-hover={true/false}
 *  data-focus={true/false}
 *  data-focus-visible={true/false}
 * >
 *   Button
 * </button>
 */
const button = tv({
  base: [
    "z-0",
    "group",
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "box-border",
    "appearance-none",
    "outline-none",
    "select-none",
    "font-normal",
    "subpixel-antialiased",
    "data-[pressed=true]:scale-95",
    "overflow-hidden",
    "tap-highlight-transparent",
    // focus ring
    "data-[focus-visible=true]:z-10",
    "data-[focus-visible=true]:outline-none",
    "data-[focus-visible=true]:ring-2",
    "data-[focus-visible=true]:ring-primary",
    "data-[focus-visible=true]:ring-offset-2",
    "data-[focus-visible=true]:ring-offset-background",
    "data-[focus-visible=true]:dark:ring-offset-background-dark",
  ],
  variants: {
    variant: {
      solid: "",
      bordered: "border-2 bg-transparent",
      light: "bg-transparent",
      flat: "",
      faded: "border-2",
      shadow: "",
      ghost: "border-2 bg-transparent",
    },
    size: {
      xs: "px-2 min-w-[5rem] h-6 text-xs gap-1",
      sm: "px-3 min-w-[6rem] h-8 text-sm gap-2",
      md: "px-4 min-w-[7rem] h-10 text-sm gap-2",
      lg: "px-6 min-w-[8rem] h-12 text-base gap-3",
      xl: "px-8 min-w-[10rem] h-14 text-lg gap-3",
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
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
    isLoading: {
      true: "opacity-50 pointer-events-none",
    },
    isInGroup: {
      true: "[&:not(:first-child):not(:last-child)]:rounded-none",
    },
    isIconOnly: {
      true: "p-0 gap-0",
      false: "[&>svg]:max-w-[2em]",
    },
    disableAnimation: {
      true: "!transition-none",
      false: "transition-transform-colors motion-reduce:transition-none",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "default",
    radius: "xl",
    fullWidth: false,
    isDisabled: false,
    isLoading: false,
    isInGroup: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: colorVariants.solid.default,
    },
    {
      variant: "solid",
      color: "primary",
      class: colorVariants.solid.primary,
    },
    {
      variant: "solid",
      color: "secondary",
      class: colorVariants.solid.secondary,
    },
    {
      variant: "solid",
      color: "success",
      class: colorVariants.solid.success,
    },
    {
      variant: "solid",
      color: "warning",
      class: colorVariants.solid.warning,
    },
    {
      variant: "solid",
      color: "danger",
      class: colorVariants.solid.danger,
    },
    // shadow / color
    {
      variant: "shadow",
      color: "default",
      class: colorVariants.shadow.default,
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
      color: "default",
      class: colorVariants.bordered.default,
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
      color: "default",
      class: colorVariants.flat.default,
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
      color: "default",
      class: colorVariants.faded.default,
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
      color: "default",
      class: [colorVariants.light.default, "data-[hover=true]:bg-default/20"],
    },
    {
      variant: "light",
      color: "primary",
      class: [colorVariants.light.primary, "data-[hover=true]:bg-primary/20"],
    },
    {
      variant: "light",
      color: "secondary",
      class: [colorVariants.light.secondary, "data-[hover=true]:bg-secondary/20"],
    },
    {
      variant: "light",
      color: "success",
      class: [colorVariants.light.success, "data-[hover=true]:bg-success/20"],
    },
    {
      variant: "light",
      color: "warning",
      class: [colorVariants.light.warning, "data-[hover=true]:bg-warning/20"],
    },
    {
      variant: "light",
      color: "danger",
      class: [colorVariants.light.danger, "data-[hover=true]:bg-danger/20"],
    },
    // ghost / color
    {
      variant: "ghost",
      color: "default",
      class: colorVariants.ghost.default,
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
    // isInGroup / bordered / ghost
    {
      isInGroup: true,
      variant: ["bordered", "ghost"],
      class: "[&:not(:first-child)]:border-l-0",
    },
    // isIconOnly / size
    {
      isIconOnly: true,
      size: "xs",
      class: "min-w-[1.5rem] w-6 h-6",
    },
    {
      isIconOnly: true,
      size: "sm",
      class: "min-w-[2rem] w-8 h-8",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "min-w-[2.5rem] w-10 h-10",
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "min-w-[3rem] w-12 h-12",
    },
    {
      isIconOnly: true,
      size: "xl",
      class: "min-w-[3.5rem] w-14 h-14",
    },
  ],
});

// size: {
//   xs: "px-2 h-6 text-xs",
//   sm: "px-3 h-8 text-sm",
//   md: "px-4 h-10 text-base",
//   lg: "px-6 h-12 text-base",
//   xl: "px-8 h-14 text-lg",
// },

/**
 * ButtonGroup wrapper **Tailwind Variants** component
 *
 * const classNames = buttonGroup({...})
 *
 * @example
 * <div role="group" className={classNames())}>
 *   // button elements
 * </div>
 */
const buttonGroup = tv({
  base: "inline-flex items-center justify-center h-auto",
  variants: {
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
export type ButtonVariantProps = VariantProps<typeof button>;

export {button, buttonGroup};
