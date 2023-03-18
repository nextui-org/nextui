import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../utils";
/**
 * AccordionItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, content } = accordionItem({...})
 *
 * @example
 * <div className={base())}>
 *   <div className={heading())}>
 *    <button className={trigger())}>Trigger</button>
 *    <span className={indicator())}>Indicator</span>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
const accordionItem = tv({
  slots: {
    base: "py-2 [&:not(:last-of-type)]:border-b border-neutral",
    heading: "",
    trigger: "py-2 flex w-full outline-none items-center",
    indicator: "rotate-0 data-[open=true]:-rotate-90",
    title: "flex-1 text-left text-foreground",
    subtitle: "",
    content: "py-2",
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
    radius: {
      none: {},
      base: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      "2xl": {},
      "3xl": {},
      full: {},
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isFocusVisible: {
      true: {
        trigger: [...ringClasses],
      },
    },
    disableAnimation: {
      true: {
        content: "hidden data-[open=true]:block",
      },
      false: {
        indicator: "transition-transform",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type AccordionItemVariantProps = VariantProps<typeof accordionItem>;
export type AccordionItemSlots = keyof ReturnType<typeof accordionItem>;

export {accordionItem};
