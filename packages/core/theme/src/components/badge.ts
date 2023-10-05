import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants} from "../utils";

/**
 * Badge wrapper **Tailwind Variants** component
 *
 * const {base, badge} = badge({...})
 *
 * @example
 * <div className={base())}>
 *   // children
 *   <span className={badge()}>5+</span>
 * </div>
 */
const badge = tv({
  slots: {
    base: ["relative", "inline-flex", "shrink-0"],
    badge: [
      "flex",
      "z-10",
      "flex-wrap",
      "absolute",
      "box-border",
      "rounded-full",
      "whitespace-nowrap",
      "place-content-center",
      "origin-center",
      "items-center",
      "text-inherit",
      "select-none",
      "font-regular",
      "scale-100",
      "opacity-100",
      "subpixel-antialiased",
      "data-[invisible=true]:scale-0",
      "data-[invisible=true]:opacity-0",
    ],
  },
  variants: {
    variant: {
      solid: {},
      flat: {},
      faded: {
        badge: "border-medium",
      },
      shadow: {},
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {
        badge: "px-1 text-tiny",
      },
      md: {
        badge: "px-1 text-small",
      },
      lg: {
        badge: "px-1 text-small",
      },
    },
    placement: {
      "top-right": {},
      "top-left": {},
      "bottom-right": {},
      "bottom-left": {},
    },
    shape: {
      circle: {},
      rectangle: {},
    },
    isInvisible: {
      true: {},
    },
    isOneChar: {
      true: {
        badge: "px-0",
      },
    },
    isDot: {
      true: {},
    },
    disableAnimation: {
      true: {
        badge: "transition-none",
      },
      false: {
        badge: "transition-transform-opacity !ease-soft-spring !duration-300",
      },
    },
    showOutline: {
      true: {
        badge: "border-2 border-background",
      },
      false: {
        badge: "border-transparent border-0",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    shape: "rectangle",
    placement: "top-right",
    showOutline: true,
    disableAnimation: false,
    isInvisible: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: {
        badge: colorVariants.solid.default,
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        badge: colorVariants.solid.primary,
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        badge: colorVariants.solid.secondary,
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        badge: colorVariants.solid.success,
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        badge: colorVariants.solid.warning,
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        badge: colorVariants.solid.danger,
      },
    },
    // shadow / color
    {
      variant: "shadow",
      color: "default",
      class: {
        badge: colorVariants.shadow.default,
      },
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        badge: colorVariants.shadow.primary,
      },
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        badge: colorVariants.shadow.secondary,
      },
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        badge: colorVariants.shadow.success,
      },
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        badge: colorVariants.shadow.warning,
      },
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        badge: colorVariants.shadow.danger,
      },
    },
    // flat / color
    {
      variant: "flat",
      color: "default",
      class: {
        badge: colorVariants.flat.default,
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        badge: colorVariants.flat.primary,
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        badge: colorVariants.flat.secondary,
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        badge: colorVariants.flat.success,
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        badge: colorVariants.flat.warning,
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        badge: colorVariants.flat.danger,
      },
    },
    // faded / color
    {
      variant: "faded",
      color: "default",
      class: {
        badge: colorVariants.faded.default,
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        badge: colorVariants.faded.primary,
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        badge: colorVariants.faded.secondary,
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        badge: colorVariants.faded.success,
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        badge: colorVariants.faded.warning,
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        badge: colorVariants.faded.danger,
      },
    },
    // isOneChar / size
    {
      isOneChar: true,
      size: "sm",
      class: {
        badge: "w-4 h-4 min-w-4 min-h-4",
      },
    },
    {
      isOneChar: true,
      size: "md",
      class: {
        badge: "w-5 h-5 min-w-5 min-h-5",
      },
    },
    {
      isOneChar: true,
      size: "lg",
      class: {
        badge: "w-6 h-6 min-w-6 min-h-6",
      },
    },
    // isDot / size
    {
      isDot: true,
      size: "sm",
      class: {
        badge: "w-3 h-3 min-w-3 min-h-3",
      },
    },
    {
      isDot: true,
      size: "md",
      class: {
        badge: "w-3.5 h-3.5 min-w-3.5 min-h-3.5",
      },
    },
    {
      isDot: true,
      size: "lg",
      class: {
        badge: "w-4 h-4 min-w-4 min-h-4",
      },
    },
    // placement / rectangle
    {
      placement: "top-right",
      shape: "rectangle",
      class: {
        badge: "top-[5%] right-[5%] translate-x-1/2 -translate-y-1/2",
      },
    },
    {
      placement: "top-left",
      shape: "rectangle",
      class: {
        badge: "top-[5%] left-[5%] -translate-x-1/2 -translate-y-1/2",
      },
    },
    {
      placement: "bottom-right",
      shape: "rectangle",
      class: {
        badge: "bottom-[5%] right-[5%] translate-x-1/2 translate-y-1/2",
      },
    },
    {
      placement: "bottom-left",
      shape: "rectangle",
      class: {
        badge: "bottom-[5%] left-[5%] -translate-x-1/2 translate-y-1/2",
      },
    },
    // placement / circle
    {
      placement: "top-right",
      shape: "circle",
      class: {
        badge: "top-[10%] right-[10%] translate-x-1/2 -translate-y-1/2",
      },
    },
    {
      placement: "top-left",
      shape: "circle",
      class: {
        badge: "top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2",
      },
    },
    {
      placement: "bottom-right",
      shape: "circle",
      class: {
        badge: "bottom-[10%] right-[10%] translate-x-1/2 translate-y-1/2",
      },
    },
    {
      placement: "bottom-left",
      shape: "circle",
      class: {
        badge: "bottom-[10%] left-[10%] -translate-x-1/2 translate-y-1/2",
      },
    },
  ],
});

export type BadgeVariantProps = VariantProps<typeof badge>;
export type BadgeSlots = keyof ReturnType<typeof badge>;

export {badge};
