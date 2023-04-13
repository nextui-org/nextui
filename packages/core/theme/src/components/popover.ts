import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {colorVariants, ringClasses} from "../utils";
/**
 * Popover wrapper **Tailwind Variants** component
 *
 * const { base, trigger, arrow } = popover({...})
 *
 * @example
 * <div>
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
      "!outline-none",
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
    variant: {
      solid: {base: ""},
      bordered: {
        base: "border-2 !bg-background",
        arrow: "border-2 border-inherit !bg-background",
      },
      light: {base: "!bg-transparent", arrow: "hidden"},
      faded: {base: "border", arrow: "border border-inherit"},
      flat: {base: ""},
      shadow: {base: ""},
    },
    color: {
      neutral: {base: colorVariants.solid.neutral},
      foreground: {base: colorVariants.solid.foreground},
      primary: {base: colorVariants.solid.primary},
      secondary: {base: colorVariants.solid.secondary},
      success: {base: colorVariants.solid.success},
      warning: {base: colorVariants.solid.warning},
      danger: {base: colorVariants.solid.danger},
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
    backdropVariant: {
      transparent: {},
      opaque: {
        backdrop: "bg-black/30 backdrop-opacity-50",
      },
      blur: {
        backdrop: "backdrop-blur-sm backdrop-saturate-150 bg-black/20",
      },
    },
    isFocusVisible: {
      true: {
        base: [...ringClasses],
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
    variant: "solid",
    color: "neutral",
    radius: "xl",
    backdropVariant: "transparent",
    disableAnimation: false,
    triggerScaleOnOpen: true,
  },
  compoundVariants: [
    // shadow / color
    {
      variant: "shadow",
      color: "neutral",
      class: {
        base: colorVariants.shadow.neutral,
      },
    },
    {
      variant: "shadow",
      color: "foreground",
      class: {base: colorVariants.shadow.foreground},
    },
    {
      variant: "shadow",
      color: "primary",
      class: {base: colorVariants.shadow.primary},
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {base: colorVariants.shadow.secondary},
    },
    {
      variant: "shadow",
      color: "success",
      class: {base: colorVariants.shadow.success},
    },
    {
      variant: "shadow",
      color: "warning",
      class: {base: colorVariants.shadow.warning},
    },
    {
      variant: "shadow",
      color: "danger",
      class: {base: colorVariants.shadow.danger},
    },
    // bordered / color
    {
      variant: "bordered",
      color: "neutral",
      class: {base: colorVariants.bordered.neutral},
    },
    {
      variant: "bordered",
      color: "foreground",
      class: {base: colorVariants.bordered.foreground},
    },
    {
      variant: "bordered",
      color: "primary",
      class: {base: colorVariants.bordered.primary},
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {base: colorVariants.bordered.secondary},
    },
    {
      variant: "bordered",
      color: "success",
      class: {base: colorVariants.bordered.success},
    },
    {
      variant: "bordered",
      color: "warning",
      class: {base: colorVariants.bordered.warning},
    },
    {
      variant: "bordered",
      color: "danger",
      class: {base: colorVariants.bordered.danger},
    },
    // flat / color
    {
      variant: "flat",
      color: "neutral",
      class: {base: colorVariants.flat.neutral},
    },
    {
      variant: "flat",
      color: "foreground",
      class: {base: colorVariants.flat.foreground},
    },
    {
      variant: "flat",
      color: "primary",
      class: {base: colorVariants.flat.primary},
    },
    {
      variant: "flat",
      color: "secondary",
      class: {base: colorVariants.flat.secondary},
    },
    {
      variant: "flat",
      color: "success",
      class: {base: colorVariants.flat.success},
    },
    {
      variant: "flat",
      color: "warning",
      class: {base: colorVariants.flat.warning},
    },
    {
      variant: "flat",
      color: "danger",
      class: {base: colorVariants.flat.danger},
    },
    // faded / color
    {
      variant: "faded",
      color: "neutral",
      class: {base: colorVariants.faded.neutral},
    },
    {
      variant: "faded",
      color: "foreground",
      class: {base: colorVariants.faded.foreground},
    },
    {
      variant: "faded",
      color: "primary",
      class: {base: colorVariants.faded.primary},
    },
    {
      variant: "faded",
      color: "secondary",
      class: {base: colorVariants.faded.secondary},
    },
    {
      variant: "faded",
      color: "success",
      class: {base: colorVariants.faded.success},
    },
    {
      variant: "faded",
      color: "warning",
      class: {base: colorVariants.faded.warning},
    },
    {
      variant: "faded",
      color: "danger",
      class: {base: colorVariants.faded.danger},
    },
    // light / color
    {
      variant: "light",
      color: "neutral",
      class: {base: colorVariants.light.neutral},
    },
    {
      variant: "light",
      color: "foreground",
      class: {base: colorVariants.light.foreground},
    },
    {
      variant: "light",
      color: "primary",
      class: {base: colorVariants.light.primary},
    },
    {
      variant: "light",
      color: "secondary",
      class: {base: colorVariants.light.secondary},
    },
    {
      variant: "light",
      color: "success",
      class: {base: colorVariants.light.success},
    },
    {
      variant: "light",
      color: "warning",
      class: {base: colorVariants.light.warning},
    },
    {
      variant: "light",
      color: "danger",
      class: {base: colorVariants.light.danger},
    },
    // backdropVariant (opaque/blur)
    {
      backdropVariant: ["opaque", "blur"],
      class: {
        backdrop: "block w-full h-full fixed inset-0 -z-30",
      },
    },
  ],
});

export type PopoverVariantProps = VariantProps<typeof popover>;
export type PopoverSlots = keyof ReturnType<typeof popover>;

export {popover};
