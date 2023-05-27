import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Accordion wrapper **Tailwind Variants** component
 *
 * const styles = accordion({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // accordion elements
 * </div>
 */
const accordion = tv({
  base: "px-2",
  variants: {
    variant: {
      light: "",
      shadow: "px-4 shadow-lg rounded-xl bg-background dark:bg-content1 border border-default-100",
      bordered: "px-4 border border-default rounded-lg",
      splitted: "group is-splitted flex flex-col gap-2", // the classNames are applied in the accordion-item component
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "light",
    fullWidth: true,
  },
});

/**
 * AccordionItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, startContent, title, subtitle, content } = accordionItem({...})
 *
 * @example
 * <div className={base())}>
 *   <div className={heading())}>
 *    <button className={trigger())}>
 *      <div className={startContent()}>
 *         // content
 *      </div>
 *      <div className={titleWrapper()}>
 *        <h3 className={title())}>Title</h3>
 *        <span className={subtitle())}>Subtitle</span>
 *      </div>
 *      <span className={indicator())}>Indicator</span>
 *    </button>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
const accordionItem = tv({
  slots: {
    base: [
      "border-default",
      "[&:not(:last-of-type)]:border-b",
      "group-[.is-splitted]:px-4",
      "group-[.is-splitted]:bg-background",
      "dark:group-[.is-splitted]:bg-content1",
      "group-[.is-splitted]:shadow-lg",
      "group-[.is-splitted]:rounded-lg",
      "group-[.is-splitted]:border",
      "group-[.is-splitted]:border-default-100",
    ],
    heading: "",
    trigger: [
      "flex py-4 w-full h-full gap-3 outline-none items-center",
      // focus ring
      "data-[focus-visible=true]:outline-none",
      "data-[focus-visible=true]:ring-2",
      "data-[focus-visible=true]:ring-primary",
      "data-[focus-visible=true]:ring-offset-2",
      "data-[focus-visible=true]:ring-offset-background",
      "data-[focus-visible=true]:dark:ring-offset-background-dark",
    ],
    startContent: "flex-shrink-0",
    indicator: "text-default-400",
    titleWrapper: "flex-1 flex flex-col text-left",
    title: "text-foreground text-lg",
    subtitle: "text-sm text-default-500 font-normal",
    content: "py-2",
  },
  variants: {
    isCompact: {
      true: {
        trigger: "py-2",
        title: "text-base",
        subtitle: "text-xs",
        indicator: "text-base",
        content: "py-1",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    hideDivider: {
      true: {
        base: "!border-b-0",
      },
    },
    hideIndicator: {
      true: {
        indicator: "hidden",
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
    disableIndicatorAnimation: {
      true: {
        indicator: "transition-none",
      },
      false: {
        indicator: "rotate-0 data-[open=true]:-rotate-90",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    isDisabled: false,
    hideDivider: false,
    hideIndicator: false,
    disableAnimation: false,
    disableIndicatorAnimation: false,
  },
});

export type AccordionGroupVariantProps = VariantProps<typeof accordion>;

export type AccordionItemVariantProps = VariantProps<typeof accordionItem>;
export type AccordionItemSlots = keyof ReturnType<typeof accordionItem>;

export {accordion, accordionItem};
