import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {colorVariants} from "../utils";

/**
 * Tabs wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, tabList, tab, panel} = tabs({...})
 *
 * <div className={base())}>
 *  <div className={tabList())}>
 *    <div className={tab())}>Tab 1</div>
 *    <div className={tab())}>Tab 2</div>
 *    <div className={tab())}>Tab 3</div>
 *  </div>
 *  <div className={panel())}>Selected panel</div>
 * </div>
 * ```
 */
const tabs = tv({
  slots: {
    base: "inline-block",
    tabList: ["flex", "items-center", "gap-2", "bg-neutral-100", "p-1"],
    tab: [
      "z-0",
      "w-full",
      "px-3",
      "py-1",
      "flex",
      "group",
      "relative",
      "justify-center",
      "items-center",
      "outline-none",
      "cursor-pointer",
      "transition-opacity",
      "text-neutral-600",
      "data-[selected=true]:text-foreground",
      "data-[hover-unselected=true]:opacity-70",
      // focus ring
      "data-[focus-visible=true]:outline-none",
      "data-[focus-visible=true]:ring-2",
      "data-[focus-visible=true]:ring-primary",
      "data-[focus-visible=true]:ring-offset-2",
      "data-[focus-visible=true]:ring-offset-background",
      "data-[focus-visible=true]:dark:ring-offset-background-dark",
    ],
    tabContent: ["relative", "z-10"],
    cursor: ["absolute", "inset-0", "z-0", "bg-white", "shadow-md"],
    panel: ["mt-3"],
  },
  variants: {
    color: {
      neutral: {
        cursor: ["bg-background", "dark:bg-neutral"],
        tabContent: "group-data-[selected=true]:text-neutral-foreground",
      },
      primary: {
        cursor: colorVariants.solid.primary,
        tabContent: "group-data-[selected=true]:text-primary-foreground",
      },
      secondary: {
        cursor: colorVariants.solid.secondary,
        tabContent: "group-data-[selected=true]:text-secondary-foreground",
      },
      success: {
        cursor: colorVariants.solid.success,
        tabContent: "group-data-[selected=true]:text-success-foreground",
      },
      warning: {
        cursor: colorVariants.solid.warning,
        tabContent: "group-data-[selected=true]:text-warning-foreground",
      },
      danger: {
        cursor: colorVariants.solid.danger,
        tabContent: "group-data-[selected=true]:text-danger-foreground",
      },
    },
    size: {
      xs: {
        tabContent: "text-xs",
        tab: "h-7",
      },
      sm: {
        tabContent: "text-sm",
        tab: "h-8",
      },
      md: {
        tabContent: "text-sm",
        tab: "h-9",
      },
      lg: {
        tabContent: "text-base",
        tab: "h-10",
      },
      xl: {
        tabContent: "text-base",
        tab: "h-11",
      },
    },
    radius: {
      none: {
        tabList: "rounded-none",
        tab: "rounded-none",
        cursor: "rounded-none",
      },
      base: {
        tabList: "rounded",
        tab: "rounded",
        cursor: "rounded",
      },
      sm: {
        tabList: "rounded-sm",
        tab: "rounded-sm",
        cursor: "rounded-sm",
      },
      md: {
        tabList: "rounded-md",
        tab: "rounded-md",
        cursor: "rounded-md",
      },
      lg: {
        tabList: "rounded-lg",
        tab: "rounded-lg",
        cursor: "rounded-lg",
      },
      xl: {
        tabList: "rounded-xl",
        tab: "rounded-xl",
        cursor: "rounded-xl",
      },
      "2xl": {
        tabList: "rounded-2xl",
        tab: "rounded-2xl",
        cursor: "rounded-2xl",
      },
      "3xl": {
        tabList: "rounded-3xl",
        tab: "rounded-3xl",
        cursor: "rounded-3xl",
      },
      full: {
        tabList: "rounded-full",
        tab: "rounded-full",
        cursor: "rounded-full",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
        tabList: "w-full",
      },
    },
    isDisabled: {
      true: {
        tabList: "opacity-50 pointer-events-none",
      },
    },
  },
  defaultVariants: {
    radius: "lg",
    color: "neutral",
    size: "md",
    fullWidth: false,
    isDisabled: false,
  },
});

export type TabsVariantProps = VariantProps<typeof tabs>;
export type TabsSlots = keyof ReturnType<typeof tabs>;
export type TabsReturnType = ReturnType<typeof tabs>;

export {tabs};
