import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants, dataFocusVisibleClasses} from "../utils";
/**
 * Popover wrapper **Tailwind Variants** component
 *
 * const { base, content, trigger, backdrop } = popover({...})
 *
 * @example
 * <div>
 *  <div className={backdrop()} />
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    <div className={content()} />
 *      // popover content
 *    </div>
 *  </div>
 * </div>
 */
const popover = tv({
  slots: {
    base: [
      "z-0",
      "relative",
      "bg-transparent",
      // arrow
      "before:content-['']",
      "before:hidden",
      "before:z-[-1]",
      "before:absolute",
      "before:rotate-45",
      "before:w-2.5",
      "before:h-2.5",
      "before:rounded-sm",
      // visibility
      "data-[arrow=true]:before:block",
      // top
      "data-[placement=top]:before:-bottom-1",
      "data-[placement=top]:before:left-1/2",
      "data-[placement=top]:before:-translate-x-1/2",
      "data-[placement=top-start]:before:-bottom-1",
      "data-[placement=top-start]:before:left-3",
      "data-[placement=top-end]:before:-bottom-1",
      "data-[placement=top-end]:before:right-3",
      // bottom
      "data-[placement=bottom]:before:-top-1",
      "data-[placement=bottom]:before:left-1/2",
      "data-[placement=bottom]:before:-translate-x-1/2",
      "data-[placement=bottom-start]:before:-top-1",
      "data-[placement=bottom-start]:before:left-3",
      "data-[placement=bottom-end]:before:-top-1",
      "data-[placement=bottom-end]:before:right-3",
      // left
      "data-[placement=left]:before:-right-[calc(theme(spacing.1)_-_1px)]",
      "data-[placement=left]:before:top-1/2",
      "data-[placement=left]:before:-translate-y-1/2",
      "data-[placement=left-start]:before:-right-[calc(theme(spacing.1)_-_1.5px)]",
      "data-[placement=left-start]:before:top-1/4",
      "data-[placement=left-end]:before:-right-[calc(theme(spacing.1)_-_1.5px)]",
      "data-[placement=left-end]:before:bottom-1/4",
      // right
      "data-[placement=right]:before:-left-[calc(theme(spacing.1)_-_1px)]",
      "data-[placement=right]:before:top-1/2",
      "data-[placement=right]:before:-translate-y-1/2",
      "data-[placement=right-start]:before:-left-[calc(theme(spacing.1)_-_1.5px)]",
      "data-[placement=right-start]:before:top-1/4",
      "data-[placement=right-end]:before:-left-[calc(theme(spacing.1)_-_1.5px)]",
      "data-[placement=right-end]:before:bottom-1/4",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    content: [
      "z-10",
      "px-4",
      "py-1",
      "inline-flex",
      "flex-col",
      "items-center",
      "justify-center",
      "box-border",
      "subpixel-antialiased",
      "outline-none",
      "box-border",
    ],
    trigger: ["z-10"],
    backdrop: ["hidden"],
    arrow: [],
  },
  variants: {
    size: {
      sm: {content: "text-tiny"},
      md: {content: "text-small"},
      lg: {content: "text-medium"},
    },
    color: {
      default: {
        base: "before:bg-content1 before:shadow-small",
        content: "bg-content1",
      },
      foreground: {
        base: "before:bg-foreground",
        content: colorVariants.solid.foreground,
      },
      primary: {
        base: "before:bg-primary",
        content: colorVariants.solid.primary,
      },
      secondary: {
        base: "before:bg-secondary",
        content: colorVariants.solid.secondary,
      },
      success: {
        base: "before:bg-success",
        content: colorVariants.solid.success,
      },
      warning: {
        base: "before:bg-warning",
        content: colorVariants.solid.warning,
      },
      danger: {
        base: "before:bg-danger",
        content: colorVariants.solid.danger,
      },
    },
    radius: {
      none: {content: "rounded-none"},
      sm: {content: "rounded-small"},
      md: {content: "rounded-medium"},
      lg: {content: "rounded-large"},
      full: {content: "rounded-full"},
    },
    shadow: {
      sm: {
        content: "shadow-small",
      },
      md: {
        content: "shadow-medium",
      },
      lg: {
        content: "shadow-large",
      },
    },
    backdrop: {
      transparent: {},
      opaque: {
        backdrop: "bg-overlay/50 backdrop-opacity-disabled",
      },
      blur: {
        backdrop: "backdrop-blur-sm backdrop-saturate-150 bg-overlay/30",
      },
    },
    triggerScaleOnOpen: {
      true: {
        trigger: ["aria-expanded:scale-[0.97]", "aria-expanded:opacity-70", "subpixel-antialiased"],
      },
      false: {},
    },
    disableAnimation: {
      true: {
        base: "animate-none",
      },
    },
  },
  defaultVariants: {
    color: "default",
    radius: "lg",
    size: "md",
    shadow: "md",
    backdrop: "transparent",
    disableAnimation: false,
    triggerScaleOnOpen: true,
  },
  compoundVariants: [
    // backdrop (opaque/blur)
    {
      backdrop: ["opaque", "blur"],
      class: {
        backdrop: "block w-full h-full fixed inset-0 -z-30",
      },
    },
  ],
});

export type PopoverVariantProps = VariantProps<typeof popover>;
export type PopoverSlots = keyof ReturnType<typeof popover>;

export {popover};
