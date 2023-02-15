import {tv, type VariantProps} from "tailwind-variants";

import {translateCenterClasses} from "../../utils";

/**
 * Avatar wrapper tv component
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
      "dark:text-white",
      "z-10",
    ],
    img: ["flex", "object-cover", "w-full", "h-full"],
    name: [...translateCenterClasses, "font-semibold", "text-center", "text-white"],
    icon: [...translateCenterClasses, "flex"],
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
        name: "text-neutral-700 dark:text-white",
      },
      primary: {
        base: "bg-primary",
      },
      secondary: {
        base: "bg-secondary",
      },
      success: {
        base: "bg-success",
        name: "text-success-800",
      },
      warning: {
        base: "bg-warning",
        name: "text-warning-800",
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
        base: "outline-none ring-2 !ring-primary ring-offset-2 ring-offset-background dark:ring-offset-background-dark",
      },
    },
    isInGroup: {
      true: {
        base: "-ml-2 hover:-translate-x-3 transition-transform",
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
