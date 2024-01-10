import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

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
      //  mobile animation vars
      "[--scale-enter:100%]",
      "[--scale-exit:100%]",
      "[--slide-enter:0px]",
      "[--slide-exit:80px]",
      // tablet/desktop animation vars
      "sm:[--scale-enter:100%]",
      "sm:[--scale-exit:103%]",
      "sm:[--slide-enter:0px]",
      "sm:[--slide-exit:0px]",
    ],
    base: [
      "flex",
      "flex-col",
      "relative",
      "bg-white",
      "z-50",
      "w-full",
      "box-border",
      "bg-content1",
      "outline-none",
      "mx-1",
      "my-1",
      "sm:mx-6",
      "sm:my-16",
    ],
    backdrop: "z-50",
    header: "flex py-4 px-6 flex-initial text-large font-semibold",
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
      "text-foreground-500",
      "rounded-full",
      "hover:bg-default-100",
      "active:bg-default-200",
      "tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
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
        base: "my-0 mx-0 sm:mx-0 sm:my-0 max-w-full h-[100dvh] !rounded-none",
      },
    },
    radius: {
      none: {base: "rounded-none"},
      sm: {base: "rounded-small"},
      md: {base: "rounded-medium"},
      lg: {base: "rounded-large"},
    },
    placement: {
      auto: {
        wrapper: "items-end sm:items-center",
      },
      center: {
        wrapper: "items-center sm:items-center",
      },
      top: {
        wrapper: "items-start sm:items-start",
      },
      "top-center": {
        wrapper: "items-start sm:items-center",
      },
      bottom: {
        wrapper: "items-end sm:items-end",
      },
      "bottom-center": {
        wrapper: "items-end sm:items-center",
      },
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
      transparent: {
        backdrop: "hidden",
      },
      opaque: {
        backdrop: "bg-overlay/50 backdrop-opacity-disabled",
      },
      blur: {
        backdrop: "backdrop-blur-md backdrop-saturate-150 bg-overlay/30",
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
        wrapper: "items-start sm:items-start overflow-y-auto",
        base: "my-16",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    shadow: "sm",
    placement: "auto",
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

const drawer = tv({
  slots: {
    base: ["absolute", "m-0", "sm:m-0", "overflow-y-auto"],
  },
  variants: {
    size: {
      xs: {
        base: "max-w-xs max-h-[20rem]",
      },
      sm: {
        base: "max-w-sm max-h-[24rem]",
      },
      md: {
        base: "max-w-md max-h-[28rem]",
      },
      lg: {
        base: "max-w-lg max-h-[32rem]",
      },
      xl: {
        base: "max-w-xl max-h-[36rem]",
      },
      "2xl": {
        base: "max-w-2xl max-h-[42rem]",
      },
      "3xl": {
        base: "max-w-3xl max-h-[48rem]",
      },
      "4xl": {
        base: "max-w-4xl max-h-[56rem]",
      },
      "5xl": {
        base: "max-w-5xl max-h-[64rem]",
      },
      full: {
        base: "max-w-full max-h-full h-[100dvh] !rounded-none",
      },
    },
    placement: {
      top: {
        base: "inset-x-0 top-0 max-w-[none] rounded-t-none",
      },
      right: {
        base: "inset-y-0 right-0 max-h-[none] rounded-r-none",
      },
      bottom: {
        base: "inset-x-0 bottom-0 max-w-[none] rounded-b-none",
      },
      left: {
        base: "inset-y-0 left-0 max-h-[none] rounded-l-none",
      },
    },
  },
});

export type ModalVariantProps = VariantProps<typeof modal>;
export type ModalSlots = keyof ReturnType<typeof modal>;

export {modal, drawer};
