import {tv, VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";

const disclosure = tv({
  slots: {
    base: "",
    heading: "",
    trigger: [
      "flex py-4 w-full h-full gap-3 outline-none items-center tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    startContent: "flex-shrink-0",
    indicator: "text-default-400",
    titleWrapper: "flex-1 flex flex-col text-start select-none",
    title: "text-foreground text-medium",
    subtitle: "text-small text-foreground-500 font-normal",
    content: [
      "overflow-hidden ease-in opacity-0 data-[expanded=true]:opacity-100 data-[expanded=true]:my-2",
    ],
  },
  variants: {
    variant: {
      splitted: {
        base: "px-4 bg-content1 shadow-medium rounded-medium",
      },
    },
    isCompact: {
      true: {
        trigger: "py-2",
        title: "text-medium",
        subtitle: "text-small",
        indicator: "text-medium",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    hideIndicator: {
      true: {
        indicator: "hidden",
      },
    },
    disableAnimation: {
      true: {
        content: "",
      },
      false: {
        indicator: "transition-transform",
        trigger: "transition-opacity",
        content: "transition-all",
      },
    },
    disableIndicatorAnimation: {
      true: {
        indicator: "transition-none",
      },
      false: {
        indicator:
          "rotate-0 data-[expanded=true]:-rotate-90 rtl:-rotate-180 rtl:data-[expanded=true]:-rotate-90",
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
    hideIndicator: false,
    disableIndicatorAnimation: false,
  },
});

export type DisclosureVariantProps = VariantProps<typeof disclosure>;
export type DisclosureSlots = keyof ReturnType<typeof disclosure>;

export {disclosure};
