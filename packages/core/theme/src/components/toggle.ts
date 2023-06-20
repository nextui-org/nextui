import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Toggle (Switch) wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, thumb, thumbIcon, label, startContent, endContent} = toggle({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-selected={true/false}
 *    data-pressed={true/false}
 *    data-focus={true/false}
 *    data-hover={true/false}
 *    data-focus-visible={true/false}
 * >
 *  <input/> // hidden input
 *  <span className={wrapper()} aria-hidden="true">
 *    <svg className={startContent()}>...</svg>
 *    <span className={thumb()}>
 *      <svg className={thumbIcon()}>...</svg>
 *    </span>
 *    <svg className={endContent()}>...</svg>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const toggle = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer touch-none tap-highlight-transparent",
    wrapper: [
      "px-1",
      "relative",
      "inline-flex",
      "items-center",
      "justify-start",
      "flex-shrink-0",
      "overflow-hidden",
      "bg-default-200",
      "rounded-full",
      // focus ring
      "group-data-[focus-visible]:outline-none",
      "group-data-[focus-visible]:ring-2",
      "group-data-[focus-visible]:!ring-primary",
      "group-data-[focus-visible]:ring-offset-2",
      "group-data-[focus-visible]:ring-offset-background",
      "group-data-[focus-visible]:dark:ring-offset-background-dark",
    ],
    thumb: [
      "z-10",
      "flex",
      "items-center",
      "justify-center",
      "bg-white",
      "shadow-sm",
      "rounded-full",
      "origin-right",
    ],
    startContent: "z-0 absolute left-1.5 text-current",
    endContent: "z-0 absolute right-1.5 text-default-600",
    thumbIcon: "text-black",
    label: "relative text-foreground select-none",
  },
  variants: {
    color: {
      default: {
        wrapper: [
          "group-data-[selected=true]:bg-default-400",
          "group-data-[selected=true]:text-default-foreground",
        ],
      },
      primary: {
        wrapper: [
          "group-data-[selected=true]:bg-primary",
          "group-data-[selected=true]:text-primary-foreground",
        ],
      },
      secondary: {
        wrapper: [
          "group-data-[selected=true]:bg-secondary",
          "group-data-[selected=true]:text-secondary-foreground",
        ],
      },
      success: {
        wrapper: [
          "group-data-[selected=true]:bg-success",
          "group-data-[selected=true]:text-success-foreground",
        ],
      },
      warning: {
        wrapper: [
          "group-data-[selected=true]:bg-warning",
          "group-data-[selected=true]:text-warning-foreground",
        ],
      },
      danger: {
        wrapper: [
          "group-data-[selected=true]:bg-danger",
          "data-[selected=true]:text-danger-foreground",
        ],
      },
    },
    size: {
      xs: {
        wrapper: "w-8 h-5 mr-1",
        thumb: [
          "w-3 h-3 text-[0.6rem]",
          //selected
          "group-data-[selected=true]:ml-3",
          // pressed
          "group-data-[pressed=true]:w-4",
          "group-data-[selected]:group-data-[pressed]:ml-2",
        ],
        startContent: "text-[0.6rem] left-1",
        endContent: "text-[0.6rem] right-1",
        label: "text-xs",
      },
      sm: {
        wrapper: "w-10 h-6 mr-2",
        thumb: [
          "w-4 h-4 text-xs",
          //selected
          "group-data-[selected=true]:ml-4",
          // pressed
          "group-data-[pressed=true]:w-5",
          "group-data-[selected]:group-data-[pressed]:ml-4",
        ],
        endContent: "text-xs",
        startContent: "text-xs",
        label: "text-sm",
      },
      md: {
        wrapper: "w-12 h-7 mr-2",
        thumb: [
          "w-5 h-5 text-sm",
          //selected
          "group-data-[selected=true]:ml-5",
          // pressed
          "group-data-[pressed=true]:w-6",
          "group-data-[selected]:group-data-[pressed]:ml-4",
        ],
        endContent: "text-sm",
        startContent: "text-sm",
        label: "text-base",
      },
      lg: {
        wrapper: "w-14 h-8 mr-2",
        thumb: [
          "w-6 h-6 text-base",
          //selected
          "group-data-[selected=true]:ml-6",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-5",
        ],
        endContent: "text-base",
        startContent: "text-base",
        label: "text-lg",
      },
      xl: {
        wrapper: "w-16 h-9 mr-2",
        thumb: [
          "w-7 h-7 text-lg",
          //selected
          "group-data-[selected=true]:ml-7",
          // pressed
          "group-data-[pressed=true]:w-8",
          "group-data-[selected]:group-data-[pressed]:ml-6",
        ],
        endContent: "text-base",
        startContent: "text-base",
        label: "text-lg",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    disableAnimation: {
      true: {
        wrapper: "transition-none",
        thumb: "transition-none",
      },
      false: {
        wrapper: "transition-background",
        thumb: "transition-all",
        startContent: [
          "opacity-0",
          "scale-50",
          "transition-transform-opacity",
          "group-data-[selected=true]:scale-100",
          "group-data-[selected=true]:opacity-100",
        ],
        endContent: [
          "opacity-100",
          "transition-transform-opacity",
          "group-data-[selected=true]:translate-x-3",
          "group-data-[selected=true]:opacity-0",
        ],
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ToggleVariantProps = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export {toggle};
