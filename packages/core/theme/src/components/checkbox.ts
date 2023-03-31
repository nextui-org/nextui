import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * Checkbox wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, icon, label} = checkbox({...})
 *
 * @example
 * <label className={base())}>
 *  // hidden input
 *  <span className={wrapper()} aria-hidden="true" data-checked={checked}>
 *     <svg className={icon()}>
 *       // check icon
 *     </svg>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const checkbox = tv({
  slots: {
    base: "relative max-w-fit inline-flex items-center justify-start cursor-pointer",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "flex-shrink-0",
      "overflow-hidden",
      // before
      "before:content-['']",
      "before:absolute",
      "before:inset-0",
      "before:border-solid",
      "before:border-2",
      "before:box-border",
      "before:border-neutral",
      // after
      "after:content-['']",
      "after:absolute",
      "after:inset-0",
      "after:scale-50",
      "after:opacity-0",
      "after:origin-center",
      "data-[checked=true]:after:scale-100",
      "data-[checked=true]:after:opacity-100",
      // hover
      "hover:before:bg-neutral-100",
      "data-[hover=true]:before:bg-neutral-100",
    ],
    icon: "z-10 w-4 h-3 opacity-0 data-[checked=true]:opacity-100",
    label: "relative text-foreground select-none",
  },
  variants: {
    color: {
      neutral: {
        wrapper: "after:bg-neutral after:text-neutral-contrastText text-neutral-contrastText",
      },
      primary: {
        wrapper: "after:bg-primary after:text-primary-contrastText text-primary-contrastText",
      },
      secondary: {
        wrapper: "after:bg-secondary after:text-secondary-contrastText text-secondary-contrastText",
      },
      success: {
        wrapper: "after:bg-success after:text-success-contrastText text-success-contrastText",
      },
      warning: {
        wrapper: "after:bg-warning after:text-warning-contrastText text-warning-contrastText",
      },
      danger: {
        wrapper: "after:bg-danger after:text-danger-contrastText text-danger-contrastText",
      },
    },
    size: {
      xs: {
        wrapper: "w-3.5 h-3.5 mr-1",
        label: "text-xs",
        icon: "w-3 h-2",
      },
      sm: {
        wrapper: "w-4 h-4 mr-1",
        label: "text-sm",
        icon: "w-3 h-2",
      },
      md: {
        wrapper: "w-5 h-5 mr-2",
        label: "text-base",
        icon: "w-4 h-3",
      },
      lg: {
        wrapper: "w-6 h-6 mr-2",
        label: "text-lg",
        icon: "w-5 h-4",
      },
      xl: {
        wrapper: "w-7 h-7 mr-2",
        label: "text-xl",
        icon: "w-6 h-5",
      },
    },
    radius: {
      none: {
        wrapper: "rounded-none before:rounded-none after:rounded-none",
      },
      base: {
        wrapper: "rounded before:rounded after:rounded",
      },
      sm: {
        wrapper: "rounded-sm before:rounded-sm after:rounded-sm",
      },
      md: {
        wrapper: "rounded-md before:rounded-md after:rounded-md",
      },
      lg: {
        wrapper: "rounded-lg before:rounded-lg after:rounded-lg",
      },
      xl: {
        wrapper: "rounded-xl before:rounded-xl after:rounded-xl",
      },
      full: {
        wrapper: "rounded-full before:rounded-full after:rounded-full",
      },
    },
    lineThrough: {
      true: {
        label: [
          "inline-flex",
          "items-center",
          "justify-center",
          "before:content-['']",
          "before:absolute",
          "before:bg-foreground",
          "before:w-0",
          "before:h-0.5",
          "data-[checked=true]:opacity-60",
          "data-[checked=true]:before:w-full",
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
      true: {
        wrapper: "transition-none",
        icon: "transition-none",
        label: "transition-none",
      },
      false: {
        wrapper: ["before:transition-background", "after:transition-transform-opacity"],
        icon: "transition-opacity",
        label: "transition-opacity before:transition-width",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    radius: "md",
    isDisabled: false,
    lineThrough: false,
    disableAnimation: false,
  },
});

export type CheckboxVariantProps = VariantProps<typeof checkbox>;
export type CheckboxSlots = keyof ReturnType<typeof checkbox>;

export {checkbox};
