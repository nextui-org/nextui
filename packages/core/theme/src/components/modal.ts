import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

// import {ringClasses} from "../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, trigger, backdrop, header, body, footer} = modal({...})
 *
 * <div>
 *    <button className={trigger()}>Open Modal</button>
 *    <div className={backdrop()}/>
 *    <div className={base()}>
 *       <div className={header()}>Header</div>
 *       <div className={body()}>Body</div>
 *       <div className={footer()}>Footer</div>
 *    </div>
 * </div>
 * ```
 */
const modal = tv({
  slots: {
    wrapper: [
      "flex",
      "w-screen",
      "h-screen",
      "fixed",
      "inset-0",
      "z-50",
      "overflow-x-auto",
      "overflow-y-hidden",
      "justify-center",
      "items-center",
      "outline-none",
    ],
    base: [
      "relative",
      "bg-white",
      "z-50",
      "w-full",
      "shadow-lg",
      "box-border",
      "dark:bg-content1",
      "border border-neutral-100",
    ],
    trigger: [],
    backdrop: ["hidden"],
    header: [],
    body: [],
    footer: [],
  },
  variants: {
    size: {
      xs: {
        base: "max-w-xs",
      },
      sm: {
        base: "max-w-sm",
      },
      md: {
        base: "max-w-md",
      },
      lg: {
        base: "max-w-lg",
      },
      xl: {
        base: "max-w-xl",
      },
      "2xl": {
        base: "max-w-2xl",
      },
      "3xl": {
        base: "max-w-3xl",
      },
      "4xl": {
        base: "max-w-4xl",
      },
      "5xl": {
        base: "max-w-5xl",
      },
      full: {
        base: "max-w-full",
      },
      prose: {
        base: "max-w-prose",
      },
    },
    radius: {
      none: {base: "rounded-none"},
      base: {base: "rounded"},
      sm: {base: "rounded-sm"},
      md: {base: "rounded-md"},
      lg: {base: "rounded-lg"},
      xl: {base: "rounded-xl"},
      "2xl": {base: "rounded-2xl"},
      "3xl": {base: "rounded-3xl"},
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
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    backdropVariant: "opaque",
  },
  compoundVariants: [
    // backdropVariant (opaque/blur)
    {
      backdropVariant: ["opaque", "blur"],
      class: {
        backdrop: "block w-full h-full fixed inset-0 z-0",
      },
    },
  ],
});

export type ModalVariantProps = VariantProps<typeof modal>;
export type ModalSlots = keyof ReturnType<typeof modal>;

export {modal};
