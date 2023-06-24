import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { base, menu } = dropdown({...})
 *
 * @example
 * <div>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdown = tv({
  base: [
    "w-full",
    "p-1",
    "min-w-[200px]",
    "shadow",
    "shadow-lg",
    "bg-content1",
    "border",
    "border-boundary",
  ],
});

/**
 * DropdownItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, leftIndicator, title, subtitle, content } = dropdownItem({...})
 *
 * @example
 * <div className={base())} data-focus-visible={boolean} data-hover={boolean}>
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
      "py-1.5",
      "w-full",
      "h-full",
      "box-border",
      "rounded-lg",
      "outline-none",
      "cursor-pointer",
      "tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
      "data-[focus-visible=true]:dark:ring-offset-background-content1",
    ],
    wrapper: "w-full flex flex-col items-start justify-center",
    title: "flex-1 text-base lg:text-sm font-normal truncate",
    description: [
      "text-sm lg:text-xs",
      "w-full",
      "text-foreground-500",
      "group-hover:text-current",
    ],
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
      "border-default-200",
      "group-hover:border-current",
    ],
  },
  variants: {
    variant: {
      solid: {
        base: "",
      },
      bordered: {
        base: "border-1 border-transparent bg-transparent",
      },
      light: {
        base: "bg-transparent",
      },
      faded: {
        base: "border-1 border-transparent hover:border-default data-[hover=true]:bg-default-100",
      },
      flat: {
        base: "",
      },
      shadow: {
        base: "data-[hover=true]:shadow-lg",
      },
    },
    color: {
      default: {},
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
          "before:-top-1.5",
          "before:left-0",
          "before:right-0",
          "before:h-px",
          "before:bg-divider",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    disableAnimation: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    disableAnimation: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: {
        base: "data-[hover=true]:bg-default data-[hover=true]:text-default-foreground",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "data-[hover=true]:bg-success data-[hover=true]:text-success-foreground",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: "data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground",
      },
    },
    // shadow / color
    {
      variant: "shadow",
      color: "default",
      class: {
        base: "data-[hover=true]:shadow-default/50 data-[hover=true]:bg-default data-[hover=true]:text-default-foreground",
      },
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: "data-[hover=true]:shadow-primary/30 data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground",
      },
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: "data-[hover=true]:shadow-secondary/30 data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground",
      },
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: "data-[hover=true]:shadow-success/30 data-[hover=true]:bg-success data-[hover=true]:text-success-foreground",
      },
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: "data-[hover=true]:shadow-warning/30 data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground",
      },
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: "data-[hover=true]:shadow-danger/30 data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground",
      },
    },
    // bordered / color
    {
      variant: "bordered",
      color: "default",
      class: {
        base: "data-[hover=true]:border-default",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "data-[hover=true]:border-primary data-[hover=true]:text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "data-[hover=true]:border-secondary data-[hover=true]:text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "data-[hover=true]:border-success data-[hover=true]:text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "data-[hover=true]:border-warning data-[hover=true]:text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "data-[hover=true]:border-danger data-[hover=true]:text-danger",
      },
    },
    // flat / color
    {
      variant: "flat",
      color: "default",
      class: {
        base: "data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "data-[hover=true]:bg-secondary/20 data-[hover=true]:text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "data-[hover=true]:bg-success/20 data-[hover=true]:text-success ",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "data-[hover=true]:bg-warning/20 data-[hover=true]:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "data-[hover=true]:bg-danger/20 data-[hover=true]:text-danger",
      },
    },
    // faded / color
    {
      variant: "faded",
      color: "default",
      class: {
        base: "data-[hover=true]:text-default-foreground",
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: "data-[hover=true]:text-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: "data-[hover=true]:text-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: "data-[hover=true]:text-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: "data-[hover=true]:text-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: "data-[hover=true]:text-danger",
      },
    },
    // light / color
    {
      variant: "light",
      color: "default",
      class: {
        base: "data-[hover=true]:text-default-500",
      },
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: "data-[hover=true]:text-primary",
      },
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: "data-[hover=true]:text-secondary",
      },
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: "data-[hover=true]:text-success",
      },
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: "data-[hover=true]:text-warning",
      },
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: "data-[hover=true]:text-danger",
      },
    },
  ],
});

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { section, heading } = dropdownSection({...})
 *
 * @example
 * <div>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={section()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdownSection = tv({
  slots: {
    base: "relative mb-2",
    heading: "pl-1 text-xs text-foreground-500",
    group: "pt-1",
  },
  variants: {
    showDivider: {
      true: {
        heading: [
          "mt-2",
          "before-content-['']",
          "before:absolute",
          "before:-top-1",
          "before:left-0",
          "before:right-0",
          "before:h-px",
          "before:bg-divider",
        ],
      },
    },
  },
});

/**
 * Dropdown Menu wrapper **Tailwind Variants** component
 *
 * const classNames = dropdownMenu({...})

 */
const dropdownMenu = tv({
  base: "w-full flex flex-col gap-0.5 p-1",
});

export type DropdownSectionVariantProps = VariantProps<typeof dropdownSection>;
export type DropdownSectionSlots = keyof ReturnType<typeof dropdownSection>;
export type DropdownItemVariantProps = VariantProps<typeof dropdownItem>;
export type DropdownItemSlots = keyof ReturnType<typeof dropdownItem>;

export {dropdown, dropdownItem, dropdownSection, dropdownMenu};
