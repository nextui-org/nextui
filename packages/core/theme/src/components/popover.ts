import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants, dataFocusVisibleClasses} from "../utils";
/**
 * Popover wrapper **Tailwind Variants** component
 *
 * const { base, trigger, backdrop, arrow } = popover({...})
 *
 * @example
 * <div>
 *  <div className={backdrop()} />
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    // popover content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const popover = tv({
  slots: {
    base: [
      "z-10",
      "relative",
      "inline-flex",
      "flex-col",
      "items-center",
      "justify-center",
      "box-border",
      "subpixel-antialiased",
      "px-4",
      "py-1",
      "outline-none",
      "box-border",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    trigger: ["z-10"],
    backdrop: ["hidden"],
    arrow: [
      "z-[-1]",
      "absolute",
      "rotate-45",
      "bg-inherit",
      "w-2.5",
      "h-2.5",
      "rounded-sm",
      // top
      "data-[placement=top]:-bottom-1",
      "data-[placement=top]:-translate-x-1/2",
      "data-[placement=top-start]:-bottom-1",
      "data-[placement=top-start]:-translate-x-8",
      "data-[placement=top-end]:-bottom-1",
      "data-[placement=top-end]:translate-x-6",
      // bottom
      "data-[placement=bottom]:-top-1",
      "data-[placement=bottom]:-translate-x-1/2",
      "data-[placement=bottom-start]:-top-1",
      "data-[placement=bottom-start]:-translate-x-8",
      "data-[placement=bottom-end]:-top-1",
      "data-[placement=bottom-end]:translate-x-6",
      // left
      "data-[placement=left]:-right-1",
      "data-[placement=left]:-translate-y-1/2",
      "data-[placement=left-start]:-right-1",
      "data-[placement=left-start]:-translate-y-3",
      "data-[placement=left-end]:-right-1",
      "data-[placement=left-end]:translate-y-0.5",
      // right
      "data-[placement=right]:-left-1",
      "data-[placement=right]:-translate-y-1/2",
      "data-[placement=right-start]:-left-1",
      "data-[placement=right-start]:-translate-y-3",
      "data-[placement=right-end]:-left-1",
      "data-[placement=right-end]:translate-y-0.5",
    ],
  },
  variants: {
    size: {
      sm: {base: "text-tiny"},
      md: {base: "text-small"},
      lg: {base: "text-medium"},
    },
    color: {
      default: {
        base: "bg-content1",
        arrow: "shadow-small",
      },
      foreground: {
        base: colorVariants.solid.foreground,
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
    radius: {
      none: {base: "rounded-none"},
      sm: {base: "rounded-small"},
      md: {base: "rounded-medium"},
      lg: {base: "rounded-large"},
      full: {base: "rounded-full"},
    },
    shadow: {
      sm: {
        base: "shadow-small",
      },
      md: {
        base: "shadow-medium",
      },
      lg: {
        base: "shadow-large",
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
