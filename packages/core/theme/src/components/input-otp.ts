import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const inputOtp = tv({
  slots: {},
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export type InputOtpVariantProps = VariantProps<typeof inputOtp>;
export type InputOtpSlots = keyof ReturnType<typeof inputOtp>;

export {inputOtp};
