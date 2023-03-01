import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses, colorVariants} from "../utils";

/**
 * Chip wrapper **Tailwind Variants** component
 *
 * const {base, label, dot, closeButton} = chip({...})
 *
 * @example
 * <div className={base())}>
 *    // left content
 *   <svg className={dot()}/>
 *   <label className={label()}>Default</label>
 *   <svg className={closeButton()}>close button</svg>
 * </div>
 */
const chip = tv({
  slots: {
    base: ["relative", "inline-flex", "items-center", "justify-between", "box-border"],
    label: "flex-1 text-inherit select-none font-regular",
    dot: ["w-2", "h-2", "mr-2", "rounded-full"],
    closeButton: [
      "z-10",
      "apparance-none",
      "outline-none",
      "select-none",
      "transition-opacity",
      "opacity-70",
      "hover:opacity-100",
      "cursor-pointer",
    ],
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        base: "border-2 !bg-transparent",
      },
      light: {
        base: "!bg-transparent",
      },
      flat: {},
      faded: {
        base: "border-2",
      },
      shadow: {},
      dot: {},
    },
    color: {
      neutral: {
        base: colorVariants.solid.neutral,
      },
      primary: {
        base: colorVariants.solid.primary,
      },
      secondary: {
        base: colorVariants.solid.secondary,
      },
      success: {
        base: colorVariants.solid.success,
      },
      warning: {
        base: colorVariants.solid.warning,
      },
      danger: {
        base: colorVariants.solid.danger,
      },
    },
    size: {
      xs: {
        base: "px-0.5 h-5 text-xs",
        label: "px-0.5",
        closeButton: "text-sm",
      },
      sm: {
        base: "px-1 h-6 text-sm",
        label: "px-1",
        closeButton: "text-base",
      },
      md: {
        base: "px-1 h-7 text-base",
        label: "px-1",
        closeButton: "text-lg",
      },
      lg: {
        base: "px-1 h-8 text-lg",
        label: "px-1",
        closeButton: "text-xl",
      },
      xl: {
        base: "px-1 h-9 text-xl",
        label: "px-1",
        closeButton: "text-2xl",
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
    isOneChar: {
      true: {
        base: "px-0 justify-center",
        label: "px-0 flex-none",
      },
    },
    isDisabled: {
      true: {base: "opacity-50 pointer-events-none"},
    },
    fullWidth: {
      true: {base: "w-full"},
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
    fullWidth: false,
    isDisabled: false,
  },
  compoundVariants: [
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
  ],
});

export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipSlots = keyof ReturnType<typeof chip>;

export {chip};
