import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const inputOtp = tv({
  slots: {
    base: ["relative", "flex", "flex-col"],
    inputWrapper: [],
    input: [
      "absolute",
      "inset-0",
      "border-none",
      "outline-none",
      "bg-transparent",
      "text-transparent",
    ],
    segmentWrapper: ["inline-flex", "gap-x-1"],
    segment: [
      "h-10",
      "w-10",
      "font-semibold",
      "flex",
      "justify-center",
      "items-center",
      "border-default-200",
      "data-[active=true]:border-default-400",
      "data-[active=true]:scale-110",
    ],
    caret: [
      "animate-[appearance-in_1s_infinite]",
      "font-extralight",
      "h-full",
      "w-full",
      "flex",
      "justify-center",
      "items-center",
      "text-2xl",
      "h-[50%]",
      "w-px",
      "bg-white",
    ],
    helperWrapper: ["text-xs", "mt-0.5", "font-extralight", ""],
    errorMessage: ["text-red-600"],
    description: [],
  },
  variants: {
    variant: {
      flat: {
        segment: ["border-none", "bg-default-100", "data-[active=true]:bg-default-200"],
      },
      faded: {
        segment: ["bg-default-100", "border-1", "data-[active=true]:border-2"],
      },
      bordered: {
        segment: ["border-1", "data-[active=true]:border-2"],
      },
      underlined: {
        segment: ["border-b-1", "data-[active=true]:border-b-2", "data-[active=true]:scale-100"],
      },
    },
    disableAnimation: {
      true: {
        segment: "transition-none",
      },
      false: {
        segment: "transition duration-150",
      },
    },
    isDisabled: {
      true: {
        segment: "opacity-disabled pointer-events-none",
        input: "pointer-events-none",
      },
    },
    radius: {
      none: {
        segment: "rounded-none",
      },
      sm: {
        segment: "rounded-small",
      },
      md: {
        segment: "rounded-medium",
      },
      lg: {
        segment: "rounded-large",
      },
      full: {
        segment: "rounded-full",
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {
        segment: "h-8 min-h-8 w-8 min-w-8 text-small",
      },
      md: {
        segment: "h-10 min-h-10 w-10 min-w-10 text-small",
      },
      lg: {
        segment: "h-12 min-h-12 w-12 min-w-12 text-medium",
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
  },
  compoundVariants: [
    // flat & color
    {
      variant: "flat",
      color: "default",
      class: {
        segment: "data-[has-value=true]:text-default-foreground",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        segment: ["bg-primary-50", "data-[active=true]:bg-primary-100", "text-primary"],
        caret: ["bg-primary"],
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        segment: ["bg-secondary-50", "data-[active=true]:bg-secondary-100", "text-secondary"],
        caret: ["bg-secondary"],
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        segment: ["bg-success-50", "data-[active=true]:bg-success-100", "text-success"],
        caret: ["bg-success"],
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        segment: ["bg-warning-50", "data-[active=true]:bg-warning-100", "text-warning"],
        caret: ["bg-warning"],
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        segment: ["bg-danger-50", "data-[active=true]:bg-danger-100", "text-danger"],
        caret: ["bg-danger"],
      },
    },
    // faded & color
    {
      variant: "faded",
      color: "default",
      class: {
        segment: "data-[has-value=true]:text-default-foreground",
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        segment: [
          "bg-primary-50",
          "text-primary",
          "border-1",
          "border-primary-200",
          "data-[active=true]:border-2",
          "data-[active=true]:border-primary-400",
        ],
        caret: ["bg-primary"],
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        segment: [
          "bg-secondary-50",
          "text-secondary",
          "border-1",
          "border-secondary-200",
          "data-[active=true]:border-2",
          "data-[active=true]:border-secondary-400",
        ],
        caret: ["bg-secondary"],
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        segment: [
          "bg-success-50",
          "text-success",
          "border-1",
          "border-success-200",
          "data-[active=true]:border-2",
          "data-[active=true]:border-success-400",
        ],
        caret: ["bg-success"],
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        segment: [
          "bg-warning-50",
          "text-warning",
          "border-1",
          "border-warning-200",
          "data-[active=true]:border-2",
          "data-[active=true]:border-warning-400",
        ],
        caret: ["bg-warning"],
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        segment: [
          "bg-danger-50",
          "text-danger",
          "border-1",
          "border-danger-200",
          "data-[active=true]:border-2",
          "data-[active=true]:border-danger-400",
        ],
        caret: ["bg-danger"],
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "default",
      class: {
        segment: "data-[has-value=true]:text-default-foreground",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        segment: ["border-primary-200", "text-primary", "data-[active=true]:border-primary-400"],
        caret: ["bg-primary"],
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        segment: [
          "border-secondary-200",
          "text-secondary",
          "data-[active=true]:border-secondary-400",
        ],
        caret: ["bg-secondary"],
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        segment: ["border-success-200", "text-success", "data-[active=true]:border-success-400"],
        caret: ["bg-success"],
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        segment: ["border-warning-200", "text-warning", "data-[active=true]:border-warning-400"],
        caret: ["bg-warning"],
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        segment: ["border-danger-200", "text-danger", "data-[active=true]:border-danger-400"],
        caret: ["bg-danger"],
      },
    },
    // underlined & color
    {
      variant: "underlined",
      color: "default",
      class: {
        segment: "data-[has-value=true]:text-default-foreground",
      },
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        segment: ["border-primary-200", "text-primary", "data-[active=true]:border-primary-400"],
        caret: ["bg-primary"],
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        segment: [
          "border-secondary-200",
          "text-secondary",
          "data-[active=true]:border-secondary-400",
        ],
        caret: ["bg-secondary"],
      },
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        segment: ["border-success-200", "text-success", "data-[active=true]:border-success-400"],
        caret: ["bg-success"],
      },
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        segment: ["border-warning-200", "text-warning", "data-[active=true]:border-warning-400"],
        caret: ["bg-warning"],
      },
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        segment: ["border-danger-200", "text-danger", "data-[active=true]:border-danger-400"],
        caret: ["bg-danger"],
      },
    },
  ],
});

export type InputOtpVariantProps = VariantProps<typeof inputOtp>;
export type InputOtpSlots = keyof ReturnType<typeof inputOtp>;
export type InputOtpReturnType = ReturnType<typeof inputOtp>;

export {inputOtp};
