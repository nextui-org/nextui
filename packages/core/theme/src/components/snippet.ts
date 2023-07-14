import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants} from "../utils";

/**
 * Snippet wrapper **Tailwind Variants** component
 *
 * const {base, content, pre, copy} = snippet({...})
 *
 * @example
 * <div className={base())}>
 *   <pre className={pre()}>
 *      // code snippet
 *      <div className={content()}>...</div>
 *   </pre>
 *   <button className={copy()}>
 *    <svg>
 *    // copy icon / check icon
 *    </svg>
 *  </button>
 * </div>
 */
const snippet = tv({
  slots: {
    base: "inline-flex items-center justify-between h-fit rounded-large gap-2",
    pre: "bg-transparent text-inherit font-mono font-normal inline-block whitespace-nowrap",
    content: "flex flex-col",
    symbol: "select-none",
    copyButton: [
      "group",
      "relative",
      "z-10",
      "text-large",
      "text-inherit",
      "data-[hover=true]:bg-transparent",
    ],
    copyIcon: [
      "absolute text-inherit opacity-100 scale-100 group-data-[copied=true]:opacity-0 group-data-[copied=true]:scale-50",
    ],
    checkIcon: [
      "absolute text-inherit opacity-0 scale-50 group-data-[copied=true]:opacity-100 group-data-[copied=true]:scale-100",
    ],
  },
  variants: {
    variant: {
      flat: "",
      solid: "",
      bordered: "border-medium bg-transparent",
      shadow: "",
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
        base: "px-1.5 py-0.5 text-tiny rounded-small",
      },
      md: {
        base: "px-3 py-1.5 text-small rounded-medium",
      },
      lg: {
        base: "px-4 py-2 text-medium rounded-large",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        copyIcon: "transition-transform-opacity",
        checkIcon: "transition-transform-opacity",
      },
    },
  },
  defaultVariants: {
    color: "default",
    variant: "flat",
    size: "md",
    fullWidth: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // solid - shadow / color
    {
      variant: ["solid", "shadow"],
      color: "default",
      class: {
        copyButton: "data-[focus-visible]:outline-default-foreground",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "primary",
      class: {
        copyButton: "data-[focus-visible]:outline-primary-foreground",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "secondary",
      class: {
        copyButton: "data-[focus-visible]:outline-secondary-foreground",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "success",
      class: {
        copyButton: "data-[focus-visible]:outline-success-foreground",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "warning",
      class: {
        copyButton: "data-[focus-visible]:outline-warning-foreground",
      },
    },
    {
      variant: ["solid", "shadow"],
      color: "danger",
      class: {
        copyButton: "data-[focus-visible]:outline-danger-foreground",
      },
    },
    // flat / color
    {
      variant: "flat",
      color: "default",
      class: {
        base: colorVariants.flat.default,
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
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: {
        base: colorVariants.solid.default,
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
      color: "default",
      class: {
        base: colorVariants.shadow.default,
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
      color: "default",
      class: {
        base: colorVariants.bordered.default,
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
  ],
});

export type SnippetVariantProps = VariantProps<typeof snippet>;
export type SnippetSlots = keyof ReturnType<typeof snippet>;

export {snippet};
