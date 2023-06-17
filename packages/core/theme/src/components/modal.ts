import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Modal **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, backdrop, header, body, footer} = modal({...})
 *
 * <div>
 *    <button>Open Modal</button>
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
      "h-[100dvh]",
      "fixed",
      "inset-0",
      "z-50",
      "overflow-x-auto",
      "justify-center",
      "items-start",
      "md:items-center",
    ],
    base: [
      "flex",
      "flex-col",
      "relative",
      "bg-white",
      "z-50",
      "w-full",
      "shadow-lg",
      "box-border",
      "bg-background",
      "dark:bg-content1",
      "border border-default-100",
      "outline-none",
      "my-16",
    ],
    backdrop: "z-50",
    header: "flex py-4 px-6 flex-initial text-lg font-semibold",
    body: "flex flex-1 flex-col gap-3 px-6 py-2",
    footer: "flex flex-row gap-2 px-6 py-4 justify-end",
    closeButton: [
      "absolute",
      "appearance-none",
      "outline-none",
      "select-none",
      "top-1",
      "right-1",
      "p-2",
      "text-default-500",
      "rounded-full",
      "hover:bg-default-100",
      "active:bg-default-200",
      // focus ring
      "data-[focus-visible]:outline-none",
      "data-[focus-visible]:ring-2",
      "data-[focus-visible]:!ring-primary",
      "data-[focus-visible]:ring-offset-2",
      "data-[focus-visible]:ring-offset-background",
      "data-[focus-visible]:dark:ring-offset-background-dark",
    ],
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
        base: "my-0 max-w-full h-[100dvh] !rounded-none",
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
    backdrop: {
      transparent: {
        backdrop: "hidden",
      },
      opaque: {
        backdrop: "bg-black/50 backdrop-opacity-50",
      },
      blur: {
        backdrop: "backdrop-blur-md backdrop-saturate-150 bg-black/30",
      },
    },
    scrollBehavior: {
      normal: {
        base: "overflow-y-hidden",
      },
      inside: {
        base: "max-h-[calc(100%_-_7.5rem)]",
        body: "overflow-y-auto",
      },
      outside: {
        wrapper: "md:items-start overflow-y-auto",
        base: "my-16",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    backdrop: "opaque",
    scrollBehavior: "normal",
  },
  compoundVariants: [
    // backdrop (opaque/blur)
    {
      backdrop: ["opaque", "blur"],
      class: {
        backdrop: "w-screen h-screen fixed inset-0",
      },
    },
  ],
});

export type ModalVariantProps = VariantProps<typeof modal>;
export type ModalSlots = keyof ReturnType<typeof modal>;

export {modal};
