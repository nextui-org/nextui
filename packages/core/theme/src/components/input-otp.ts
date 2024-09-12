import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const inputOtp = tv({
  slots: {
    base: ["relative", "inline-flex", "gap-x-2"],
    input: [
      "absolute",
      "inset-0",
      "border-none",
      "outline-none",
      "bg-transparent",
      "text-transparent",
    ],
    segment: ["h-10", "w-10", "font-semibold", "border", "flex", "justify-center", "items-center"],
  },
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export type InputOtpVariantProps = VariantProps<typeof inputOtp>;
export type InputOtpSlots = keyof ReturnType<typeof inputOtp>;
export type InputOtpReturnType = ReturnType<typeof inputOtp>;

export {inputOtp};
