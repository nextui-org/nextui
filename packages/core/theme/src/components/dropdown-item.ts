import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * DropdownItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, leftIndicator, title, subtitle, content } = dropdownItem({...})
 *
 * @example
 * <div className={base())}>
 *   <div className={heading())}>
 *    <button className={trigger())}>
 *      <div className={leftIndicator()}>
 *         // content
 *      </div>
 *      <div className={titleWrapper()}>
 *        <h3 className={title())}>Title</h3>
 *        <span className={subtitle())}>Subtitle</span>
 *      </div>
 *      <span className={indicator())}>Indicator</span>
 *    </button>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
const dropdownItem = tv({
  slots: {
    base: [
      "flex",
      "group",
      "gap-2",
      "items-center",
      "justify-between",
      "relative",
      "px-2",
      "py-1",
      "w-full",
      "h-full",
      "box-border",
      "rounded-lg",
      "outline-none",
      "cursor-pointer",
    ],
    title: "flex-1",
    description: [],
    selectedIcon: ["text-inherit", "w-3", "h-3", "flex-shrink-0"],
    shortcut: [
      "px-1",
      "py-0.5",
      "rounded",
      "font-sans",
      "opacity-60",
      "text-inherit",
      "text-xs",
      "border",
      "border-neutral-200",
      "group-hover:border-current",
    ],
  },
  variants: {
    variant: {
      solid: {
        base: "",
      },
      bordered: {
        base: "border-2 border-transparent bg-transparent",
      },
      light: {
        base: "bg-transparent",
      },
      faded: {
        base: "border border-transparent hover:border-neutral hover:bg-neutral-100",
      },
      flat: {
        base: "",
      },
      shadow: {
        base: "hover:shadow-lg",
      },
    },
    color: {
      neutral: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    showDivider: {
      true: {
        base: [
          "mt-2",
          "before-content-['']",
          "before:absolute",
          "before:-top-1",
          "before:left-0",
          "before:right-0",
          "before:h-px",
          "before:bg-neutral-200",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isFocusVisible: {
      true: {
        base: [...ringClasses],
      },
    },
    disableAnimation: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "neutral",
    disableAnimation: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "neutral",
      class: {
        base: "hover:bg-neutral hover:text-neutral-contrastText",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "hover:bg-primary hover:text-primary-contrastText",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "hover:bg-secondary hover:text-secondary-contrastText",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "hover:bg-success hover:text-success-contrastText",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "hover:bg-warning hover:text-warning-contrastText",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "hover:bg-danger hover:text-danger-contrastText",
      },
    },
    // shadow / color
    {
      variant: "shadow",
      color: "neutral",
      class: {
        base: "hover:shadow-neutral/50 hover:bg-neutral hover:text-neutral-contrastText",
      },
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: "hover:shadow-primary/30 hover:bg-primary hover:text-primary-contrastText",
      },
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: "hover:shadow-secondary/30 hover:bg-secondary hover:text-secondary-contrastText",
      },
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: "hover:shadow-success/30 hover:bg-success hover:text-success-contrastText",
      },
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: "hover:shadow-warning/30 hover:bg-warning hover:text-warning-contrastText",
      },
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: "hover:shadow-danger/30 hover:bg-danger hover:text-danger-contrastText",
      },
    },
    // bordered / color
    {
      variant: "bordered",
      color: "neutral",
      class: {
        base: "hover:border-neutral",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "hover:border-primary hover:text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "hover:border-secondary hover:text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "hover:border-success hover:text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "hover:border-warning hover:text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "hover:border-danger hover:text-danger",
      },
    },
    // flat / color
    {
      variant: "flat",
      color: "neutral",
      class: {
        base: "hover:bg-neutral-100 hover:text-neutral-contrastText",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "hover:bg-primary-50 hover:text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "hover:bg-secondary-100 hover:text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "hover:bg-success-50 hover:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "hover:bg-warning-50 hover:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "hover:bg-danger-50 hover:text-danger",
      },
    },
    // faded / color
    {
      variant: "faded",
      color: "neutral",
      class: {
        base: "hover:text-neutral-contrastText",
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: "hover:text-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: "hover:text-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "hover:text-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "hover:text-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "hover:text-danger",
      },
    },
    // light / color
    {
      variant: "light",
      color: "neutral",
      class: {
        base: "hover:text-neutral-500",
      },
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: "hover:text-primary",
      },
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: "hover:text-secondary",
      },
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: "hover:text-success",
      },
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: "hover:text-warning",
      },
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: "hover:text-danger",
      },
    },
  ],
});

export type DropdownItemVariantProps = VariantProps<typeof dropdownItem>;
export type DropdownItemSlots = keyof ReturnType<typeof dropdownItem>;

export {dropdownItem};
