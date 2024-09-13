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
    segmentWrapper: ["inline-flex", "bg-white", "dark:bg-black"],
    segment: [
      "h-10",
      "w-10",
      "font-semibold",
      "flex",
      "justify-center",
      "items-center",
      "border",
      "bg-inherit",
      "data-[active=true]:outline",
      "data-[active=true]:outline-2",
      "data-[active=true]:outline-blue-300",
      "data-[active=true]:border-none",
      "data-[active=true]:scale-105",
    ],
    helperWrapper: [],
    errorMessage: [],
    description: [],
  },
  variants: {
    variant: {
      flat: {
        base: [],
        segment: ["bg-default-100", "dark:bg-default-100"],
        segmentWrapper: ["gap-x-1"],
      },
      faded: {},
      bordered: {},
      underlined: {},
    },
    disableAnimation: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {},
  compoundVariants: [],
});

export type InputOtpVariantProps = VariantProps<typeof inputOtp>;
export type InputOtpSlots = keyof ReturnType<typeof inputOtp>;
export type InputOtpReturnType = ReturnType<typeof inputOtp>;

export {inputOtp};
