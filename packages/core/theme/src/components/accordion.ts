import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

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
  base: "px-2 group/base",
  variants: {
    variant: {
      light: "",
      shadow: "px-4 shadow-medium rounded-medium bg-content1",
      bordered: "px-4 border-medium border-divider rounded-medium",
      splitted: "flex flex-col gap-2",
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
      // splitted
      "group-data-[variant=splitted]/base:px-4",
      "group-data-[variant=splitted]/base:bg-content1",
      "group-data-[variant=splitted]/base:shadow-medium",
      "group-data-[variant=splitted]/base:rounded-medium",
      // light
      "group-data-[variant=light]/base:px-0",
      "group-data-[variant=light]/base:bg-transparent",
      "group-data-[variant=light]/base:shadow-none",
      "group-data-[variant=light]/base:rounded-none",
      // bordered
      "group-data-[variant=bordered]/base:px-0",
      "group-data-[variant=bordered]/base:bg-transparent",
      "group-data-[variant=bordered]/base:shadow-none",
      "group-data-[variant=bordered]/base:rounded-none",
      // shadow
      "group-data-[variant=shadow]/base:px-0",
      "group-data-[variant=shadow]/base:bg-transparent",
      "group-data-[variant=shadow]/base:shadow-none",
      "group-data-[variant=shadow]/base:rounded-none",
    ],
    heading: "",
    trigger: [
      "flex py-4 w-full h-full gap-3 outline-none items-center tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    startContent: "flex-shrink-0",
    indicator: "text-default-400",
    titleWrapper: "flex-1 flex flex-col text-start",
    title: "text-foreground text-large",
    subtitle: "text-small text-foreground-500 font-normal",
    content: "p-2",
  },
  variants: {
    isCompact: {
      true: {
        trigger: "py-2",
        title: "text-medium",
        subtitle: "text-small",
        indicator: "text-medium",
        content: "py-1",
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
        content: "hidden data-[open=true]:block",
      },
      false: {
        indicator: "transition-transform",
        trigger: "transition-opacity",
      },
    },
    disableIndicatorAnimation: {
      true: {
        indicator: "transition-none",
      },
      false: {
        indicator:
          "rotate-0 data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    isDisabled: false,
    hideIndicator: false,
    disableIndicatorAnimation: false,
  },
});

export type AccordionGroupVariantProps = VariantProps<typeof accordion>;

export type AccordionItemVariantProps = VariantProps<typeof accordionItem>;
export type AccordionItemSlots = keyof ReturnType<typeof accordionItem>;

export {accordion, accordionItem};
