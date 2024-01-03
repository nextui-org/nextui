import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

/**
 * Drawer **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, backdrop, content, header, body, footer} = drawer({...})
 *
 * <div>
 *    <button>Open Drawer</button>
 *    <div className={backdrop()}/>
 *    <div className={base()}>
 *       <div className={content()}>
 *          <div className={header()}>Header</div>
 *          <div className={body()}>Body</div>
 *          <div className={footer()}>Footer</div>
 *       </div>
 *    </div>
 * </div>
 * ```
 */
const drawer = tv({
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
    base: ["absolute", "bg-white", "z-50", "box-border", "bg-content1", "outline-none"],
    content: "flex flex-col w-full h-full outline-none relative",
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
        base: "w-[20rem] h-[20rem]",
      },
      sm: {
        base: "w-[24rem] h-[24rem]",
      },
      md: {
        base: "w-[28rem] h-[28rem]",
      },
      lg: {
        base: "w-[32rem] h-[32rem]",
      },
      xl: {
        base: "w-[36rem] h-[36rem]",
      },
      "2xl": {
        base: "w-[42rem] h-[42rem]",
      },
      "3xl": {
        base: "w-[48rem] h-[48rem]",
      },
      "4xl": {
        base: "w-[56rem] h-[56rem]",
      },
      "5xl": {
        base: "w-[64rem] h-[64rem]",
      },
      full: {
        base: "my-0 mx-0 sm:mx-0 sm:my-0 w-full h-[100dvh] !rounded-none",
      },
    },
    radius: {
      none: {base: "rounded-none"},
      sm: {base: "rounded-small"},
      md: {base: "rounded-medium"},
      lg: {base: "rounded-large"},
    },
    placement: {
      top: {
        base: "w-full inset-x-0 top-0 rounded-t-none",
      },
      right: {
        base: "h-full inset-y-0, right-0 rounded-r-none",
      },
      bottom: {
        base: "w-full inset-x-0 bottom-0 rounded-b-none",
      },
      left: {
        base: "h-full inset-y-0, left-0 rounded-l-none",
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
      inside: {
        base: "overflow-y-hidden",
        content: "overflow-y-hidden",
        body: "overflow-y-auto",
      },
      outside: {
        content: "overflow-y-auto",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    placement: "right",
    backdrop: "opaque",
    scrollBehavior: "inside",
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

export type DrawerVariantProps = VariantProps<typeof drawer>;
export type DrawerSlots = keyof ReturnType<typeof drawer>;

export {drawer};
