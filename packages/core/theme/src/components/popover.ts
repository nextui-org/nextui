import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

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
      "inline-flex",
      "flex-col",
      "items-center",
      "justify-center",
      "box-border",
      "subpixel-antialiased",
      "px-4",
      "py-1",
      "text-base",
      "outline-none",
      "box-border",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    trigger: ["z-10"],
    backdrop: ["hidden"],
    arrow: [
      "-z-10",
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
      xs: {base: "text-xs"},
      sm: {base: "text-sm"},
      md: {base: "text-sm"},
      lg: {base: "text-base"},
      xl: {base: "text-lg"},
    },
    color: {
      default: {
        base: "bg-background dark:bg-content1 border border-default-100",
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
      base: {base: "rounded"},
      sm: {base: "rounded-sm"},
      md: {base: "rounded-md"},
      lg: {base: "rounded-lg"},
      xl: {base: "rounded-xl"},
      full: {base: "rounded-full"},
    },
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-sm",
      },
      md: {
        base: "shadow-md",
      },
      lg: {
        base: "shadow-lg",
      },
      xl: {
        base: "shadow-xl",
      },
      "2xl": {
        base: "shadow-2xl",
      },
      inner: {
        base: "shadow-inner",
      },
    },
    backdrop: {
      transparent: {},
      opaque: {
        backdrop: "bg-black/50 backdrop-opacity-50",
      },
      blur: {
        backdrop: "backdrop-blur-sm backdrop-saturate-150 bg-black/30",
      },
    },
    triggerScaleOnOpen: {
      true: {
        trigger: ["aria-expanded:scale-95", "aria-expanded:opacity-70", "subpixel-antialiased"],
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
    radius: "xl",
    size: "md",
    shadow: "lg",
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
