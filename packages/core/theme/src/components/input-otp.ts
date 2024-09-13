import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const inputOtp = tv({
  slots: {
    base: ["relative", "inline-flex"],
    inputWrapper: [],
    input: [
      "absolute",
      "inset-0",
      "border-none",
      "outline-none",
      "bg-transparent",
      "text-transparent",
    ],
    segmentWrapper: ["flex"],
    segment: [
      "h-10",
      "w-10",
      "font-semibold",
      "flex",
      "justify-center",
      "items-center",
      "border",
      "bg-white",
      "dark:bg-black",
    ],
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
  },
  defaultVariants: {},
  compoundVariants: [],
});

export type InputOtpVariantProps = VariantProps<typeof inputOtp>;
export type InputOtpSlots = keyof ReturnType<typeof inputOtp>;
export type InputOtpReturnType = ReturnType<typeof inputOtp>;

export {inputOtp};
