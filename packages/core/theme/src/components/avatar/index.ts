import {tv, type VariantProps} from "tailwind-variants";

import {translateCenterClasses, ringClasses} from "../../utils";

/**
 * Avatar wrapper **Tailwind Variants** component
 *
 * const {base, img, icon, name } = avatar({...})
 *
 * @example
 * <div className={base())}>
 *    <img className={img()} src="https://picsum.photos/200/300" alt="your avatar" />
 *    <div role="img" aria-label="your name" className={name()}>your name</div>
 *    <span role="img" aria-label="your icon" className={icon()}>your icon</span>
 * </div>
 */
const avatar = tv({
  slots: {
    base: [
      "flex",
      "relative",
      "justify-center",
      "items-center",
      "box-border",
      "overflow-hidden",
      "align-middle",
      "text-white",
      "z-10",
    ],
    img: ["flex", "object-cover", "w-full", "h-full"],
    fallback: [...translateCenterClasses, "flex", "items-center", "justify-center"],
    name: [...translateCenterClasses, "font-semibold", "text-center", "text-inherit"],
    icon: [
      ...translateCenterClasses,
      "flex",
      "items-center",
      "justify-center",
      "text-inherit",
      "w-full",
      "h-full",
    ],
  },
  variants: {
    size: {
      xs: {
        base: "w-7 h-7 text-[0.625rem]",
      },
      sm: {
        base: "w-8 h-8 text-xs",
      },
      md: {
        base: "w-10 h-10 text-xs",
      },
      lg: {
        base: "w-12 h-12 text-sm",
      },
      xl: {
        base: "w-16 h-16 text-md",
      },
    },
    color: {
      neutral: {
        base: "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-100",
      },
      primary: {
        base: "bg-primary",
      },
      secondary: {
        base: "bg-secondary",
      },
      success: {
        base: "bg-success text-success-800 dark:text-success-800",
      },
      warning: {
        base: "bg-warning text-warning-800 dark:text-warning-800",
      },
      danger: {
        base: "bg-danger",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      base: {
        base: "rounded",
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
      "2xl": {
        base: "rounded-2xl",
      },
      "3xl": {
        base: "rounded-3xl",
      },
      full: {
        base: "rounded-full",
      },
    },
    isBordered: {
      true: {
        base: "ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50",
      },
    },
    isFocusVisible: {
      true: {
        base: [...ringClasses],
      },
    },
    isInGroup: {
      true: {
        base: "-ml-2 hover:-translate-x-3 transition-transform",
      },
    },
    isInGridGroup: {
      true: {
        base: "m-0 hover:translate-x-0",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "neutral",
    radius: "full",
  },
  compoundVariants: [
    {
      color: "neutral",
      isBordered: true,
      class: {
        base: "ring-neutral",
      },
    },
    {
      color: "primary",
      isBordered: true,
      class: {
        base: "ring-primary",
      },
    },
    {
      color: "secondary",
      isBordered: true,
      class: {
        base: "ring-secondary",
      },
    },
    {
      color: "success",
      isBordered: true,
      class: {
        base: "ring-success",
      },
    },
    {
      color: "warning",
      isBordered: true,
      class: {
        base: "ring-warning",
      },
    },
    {
      color: "danger",
      isBordered: true,
      class: {
        base: "ring-danger",
      },
    },
    {
      isBordered: true,
      size: "xl",
      class: {
        base: "ring",
      },
    },
    {
      isInGroup: true,
      isFocusVisible: true,
      class: {
        base: "-translate-x-3",
      },
    },
  ],
});

export type AvatarVariantProps = VariantProps<typeof avatar>;
export type AvatarSlots = keyof ReturnType<typeof avatar>;

export {avatar};
