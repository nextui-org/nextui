import {tv, type VariantProps} from "tailwind-variants";

import {translateCenterClasses} from "../../utils";

/**
 * Avatar wrapper tv component
 *
 * const {base, img, icon, initials } = avatar({...})
 *
 * @example
 * <div className={base())}>
 *    <img className={img()} src="https://picsum.photos/200/300" alt="your avatar" />
 *    <div role="img" aria-label="your initials" className={initials()}>your initials</div>
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
      "dark:text-white",
    ],
    img: ["flex", "z-10", "object-cover", "w-full", "h-full"],
    initials: [...translateCenterClasses, "font-semibold", "text-center", "text-white"],
    icon: [...translateCenterClasses, "flex", "z-10"],
  },
  variants: {
    size: {
      xs: {
        base: "w-7 h-7 text-xs",
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
        base: "bg-neutral-200 dark:bg-neutral-700",
        initials: "text-neutral-700 dark:text-white",
      },
      primary: {
        base: "bg-primary",
      },
      secondary: {
        base: "bg-secondary",
      },
      success: {
        base: "bg-success",
        initials: "text-success-800",
      },
      warning: {
        base: "bg-warning",
        initials: "text-warning-800",
      },
      error: {
        base: "bg-error",
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
      full: {
        base: "rounded-full",
      },
    },
    isBordered: {
      true: {
        base: "ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-primary ring-offset-2 ring-offset-background dark:ring-offset-background-dark",
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
      color: "error",
      isBordered: true,
      class: {
        base: "ring-error",
      },
    },
    {
      isBordered: true,
      size: "xl",
      class: {
        base: "ring",
      },
    },
  ],
});

export type AvatarVariantProps = VariantProps<typeof avatar>;
export type AvatarSlots = keyof ReturnType<typeof avatar>;

export {avatar};
