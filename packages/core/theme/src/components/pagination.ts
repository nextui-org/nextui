import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * Pagination wrapper **Tailwind Variants** component
 *
 * const {base, item, cursor} = pagination({...})
 *
 * @example
 * <ul className={base()} aria-label="pagination navigation">
 *    <li className={cursor()} aria-hidden="true"/> // this marks the active page
 *    <li role="button" className={item()} aria-label="Go to previous page" data-disabled="true">Prev</li>
 *    <li role="button" className={item()} aria-label="page 1" data-active="true">1</li>
 *    <li role="button" className={item()} aria-label="page 2">2</li>
 *    <li role="button" className={item()} aria-hidden="true">...</li>
 *    <li role="button" className={item()} aria-label="page 10">10</li>
 *    <li role="button" className={item()} aria-label="Go to next page">Next</li>
 *  </ul>
 */
const pagination = tv({
  slots: {
    base: "flex gap-1",
    item: [
      "flex",
      "items-center",
      "justify-center",
      "bg-neutral-100",
      "hover:bg-neutral-200",
      "text-neutral-contrastText",
    ],
    cursor: "",
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        item: "border-1.5 !bg-transparent",
      },
      light: {
        item: "!bg-transparent",
      },
      flat: {},
      faded: {
        item: "border-1.5",
      },
      shadow: {},
    },
    color: {
      neutral: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      xs: {
        item: "w-7 h-7 text-xs",
      },
      sm: {
        item: "w-8 h-8 text-sm",
      },
      md: {
        item: "w-9 h-9 text-sm",
      },
      lg: {
        item: "w-10 h-10 text-base",
      },
      xl: {
        item: "w-11 h-11 text-lg",
      },
    },
    radius: {
      none: {
        item: "rounded-none",
      },
      base: {
        item: "rounded",
      },
      sm: {
        item: "rounded-sm",
      },
      md: {
        item: "rounded-md",
      },
      lg: {
        item: "rounded-lg",
      },
      xl: {
        item: "rounded-xl",
      },
      full: {
        item: "rounded-full",
      },
    },
    isEven: {
      true: {
        base: "gap-0",
        item: [
          "first:rounded-r-none",
          "last:rounded-l-none",
          "[&:not(:first-child):not(:last-child)]:rounded-none",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isFocusVisible: {
      true: {
        wrapper: [...ringClasses],
      },
    },
    disableAnimation: {
      true: {},
      false: {
        item: "transition-background",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "xl",
    isEven: false,
    isDisabled: false,
    disableAnimation: false,
  },
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationSlots = keyof ReturnType<typeof pagination>;

export {pagination};
