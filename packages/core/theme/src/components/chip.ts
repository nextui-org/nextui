import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {ringClasses, colorVariants} from "../utils";

/**
 * Chip wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, content, dot, avatar, closeButton} = chip({...})
 *
 * <div className={base())}>
 *    // left content
 *   <span className={avatar()}/>
 *   <svg className={dot()}/>
 *   <span className={content()}>Default</span>
 *   <svg className={closeButton()}>close button</svg>
 *    // right content
 * </div>
 * ```
 */
const chip = tv({
  slots: {
    base: ["relative", "max-w-fit", "inline-flex", "items-center", "justify-between", "box-border"],
    content: "flex-1 text-inherit select-none font-regular",
    dot: ["w-2", "h-2", "ml-1", "rounded-full"],
    avatar: "flex-shrink-0",
    closeButton: [
      "z-10",
      "appearance-none",
      "outline-none",
      "select-none",
      "transition-opacity",
      "opacity-70",
      "hover:opacity-100",
      "cursor-pointer",
      "active:opacity-70",
    ],
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        base: "border-1.5 !bg-transparent",
      },
      light: {
        base: "!bg-transparent",
      },
      flat: {},
      faded: {
        base: "border-1.5",
      },
      shadow: {},
      dot: {
        base: "border-1.5 border-neutral text-foreground !bg-transparent",
      },
    },
    color: {
      neutral: {
        dot: "bg-neutral-400",
      },
      primary: {
        dot: "bg-primary",
      },
      secondary: {
        dot: "bg-secondary",
      },
      success: {
        dot: "bg-success",
      },
      warning: {
        dot: "bg-warning",
      },
      danger: {
        dot: "bg-danger",
      },
    },
    size: {
      xs: {
        base: "px-0.5 h-5 text-xs",
        content: "px-1",
        closeButton: "text-sm",
        avatar: "w-3.5 h-3.5",
      },
      sm: {
        base: "px-1 h-6 text-sm",
        content: "px-1",
        closeButton: "text-base",
        avatar: "w-4 h-4",
      },
      md: {
        base: "px-1 h-7 text-base",
        content: "px-2",
        closeButton: "text-lg",
        avatar: "w-5 h-5",
      },
      lg: {
        base: "px-2 h-8 text-lg",
        content: "px-2",
        closeButton: "text-xl",
        avatar: "w-6 h-6",
      },
      xl: {
        base: "px-2 h-9 text-xl",
        content: "px-2",
        closeButton: "text-2xl",
        avatar: "w-7 h-7",
      },
    },
    radius: {
      none: {base: "rounded-none"},
      base: {base: "rounded"},
      sm: {base: "rounded-sm"},
      md: {base: "rounded-md"},
      lg: {base: "rounded-lg"},
      xl: {base: "rounded-xl"},
      "2xl": {base: "rounded-2xl"},
      "3xl": {base: "rounded-3xl"},
      full: {base: "rounded-full"},
    },
    hasStartContent: {
      true: {},
    },
    hasEndContent: {
      true: {},
    },
    isOneChar: {
      true: {
        base: "px-0 justify-center",
        content: "px-0 flex-none",
      },
    },
    isDisabled: {
      true: {base: "opacity-50 pointer-events-none"},
    },
    isCloseButtonFocusVisible: {
      true: {
        closeButton: [...ringClasses, "ring-1", "rounded-full"],
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "neutral",
    size: "md",
    radius: "full",
    isDisabled: false,
  },
  compoundVariants: [
    // solid / color
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
    // flat / color
    {
      variant: "flat",
      color: "neutral",
      class: {
        base: colorVariants.flat.neutral,
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: colorVariants.flat.primary,
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: colorVariants.flat.secondary,
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: colorVariants.flat.success,
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: colorVariants.flat.warning,
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: colorVariants.flat.danger,
      },
    },
    // faded / color
    {
      variant: "faded",
      color: "neutral",
      class: {
        base: colorVariants.faded.neutral,
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: colorVariants.faded.primary,
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: colorVariants.faded.secondary,
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: colorVariants.faded.success,
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: colorVariants.faded.warning,
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: colorVariants.faded.danger,
      },
    },
    // light / color
    {
      variant: "light",
      color: "neutral",
      class: {
        base: colorVariants.light.neutral,
      },
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: colorVariants.light.primary,
      },
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: colorVariants.light.secondary,
      },
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: colorVariants.light.success,
      },
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: colorVariants.light.warning,
      },
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: colorVariants.light.danger,
      },
    },
    // isOneChar / size
    {
      isOneChar: true,
      size: "xs",
      class: {
        base: "w-4 h-4",
      },
    },
    {
      isOneChar: true,
      size: "sm",
      class: {
        base: "w-5 h-5",
      },
    },
    {
      isOneChar: true,
      size: "md",
      class: {
        base: "w-6 h-6",
      },
    },
    {
      isOneChar: true,
      size: "lg",
      class: {
        base: "w-7 h-7",
      },
    },
    {
      isOneChar: true,
      size: "xl",
      class: {
        base: "w-8 h-8",
      },
    },
    // hasStartContent / size
    {
      hasStartContent: true,
      size: ["xs", "sm"],
      class: {
        content: "pl-0.5",
      },
    },
    {
      hasStartContent: true,
      size: ["md", "lg", "xl"],
      class: {
        content: "pl-1",
      },
    },
    // hasEndContent / size
    {
      hasEndContent: true,
      size: ["xs", "sm"],
      class: {
        content: "pr-0.5",
      },
    },
    {
      hasEndContent: true,
      size: ["md", "lg", "xl"],
      class: {
        content: "pr-1",
      },
    },
  ],
});

export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipSlots = keyof ReturnType<typeof chip>;

export {chip};

// calculated classNames
// src/components/chip/src/use-chip
// max-h-[80%]
