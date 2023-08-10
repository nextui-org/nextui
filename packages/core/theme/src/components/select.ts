import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const select = tv({
  slots: {
    base: "group inline-flex flex-col relative w-52 gap-2",
    label: "block text-small font-medium text-foreground-500",
    inputWrapper: "relative w-full inline-flex flex-row items-center shadow-sm px-3 gap-3",
    innerWrapper: "inline-flex h-full items-center w-full gap-1.5 box-border",
    icon: "absolute right-2 w-4 h-4 data-[open=true]:rotate-180 transition-transform duration-150 ease",
    value: "w-full h-full font-normal text-left",
    menu: "",
    popover: "w-full p-1 w-52 min-w-[200px] overflow-hidden",
    helperWrapper: "flex relative flex-col gap-1.5 pt-1 px-1",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100",
        ],
      },
      faded: {
        inputWrapper: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
        ],
      },
      bordered: {
        inputWrapper: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "group-data-[focus=true]:border-foreground",
        ],
      },
      underlined: {
        inputWrapper: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "group-data-[focus=true]:after:w-full",
        ],
      },
    },
    color: {
      default: {},
      primary: {
        label: "text-primary",
      },
      secondary: {
        label: "text-secondary",
      },
      success: {
        label: "text-success-600 dark:text-success",
      },
      warning: {
        label: "text-warning-600 dark:text-warning",
      },
      danger: {
        label: "text-danger dark:text-danger-500",
      },
    },
    size: {
      sm: {
        label: "text-tiny",
        inputWrapper: "h-unit-8 min-h-unit-8 px-2 rounded-small",
        value: "text-small",
      },
      md: {
        inputWrapper: "h-unit-10 min-h-unit-10 rounded-medium",
        value: "text-small",
      },
      lg: {
        inputWrapper: "h-unit-12 min-h-unit-12 rounded-large",
        value: "text-medium",
      },
    },
    radius: {
      none: {
        inputWrapper: "rounded-none",
      },
      sm: {
        inputWrapper: "rounded-small",
      },
      md: {
        inputWrapper: "rounded-medium",
      },
      lg: {
        inputWrapper: "rounded-large",
      },
      full: {
        inputWrapper: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        base: "data-[has-helper=true]:pb-4 lex flex-col",
        label: "text-foreground pb-1.5",
        description: "absolute left-1",
        errorMessage: "absolute left-1",
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap data-[has-helper=true]:pb-4",
        label: "text-foreground pr-2",
        description: "absolute left-1",
        errorMessage: "absolute left-1",
      },
      inside: {
        label: "text-tiny",
        inputWrapper: "flex-col items-start justify-center gap-0",
      },
      fullWidth: {
        true: {
          base: "w-full",
        },
      },
      isInvalid: {
        true: {
          label: "!text-danger",
          value: "placeholder:text-danger text-danger",
        },
      },
      isRequired: {
        true: {
          label: "after:content-['*'] after:text-danger after:ml-0.5",
        },
      },
      disableAnimation: {
        true: {
          base: "transition-none",
          label: "transition-none",
        },
        false: {
          base: "transition-background motion-reduce:transition-none !duration-150",
          label: [
            "will-change-auto",
            "origin-top-left",
            "transition-all",
            "!duration-200",
            "!ease-[cubic-bezier(0,0,0.2,1)]",
            "motion-reduce:transition-none",
          ],
        },
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    labelPlacement: "inside",
    fullWidth: false, // TODO: implement
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // flat & faded
    {
      variant: ["flat", "faded"],
      class: {
        inputWrapper: [
          // focus ring
          ...dataFocusVisibleClasses,
        ],
      },
    },
  ],
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export {select};
