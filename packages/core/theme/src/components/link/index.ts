import {styled, type VariantProps} from "../../utils";

export const link = styled([
  "font-semibold",
  "text-blue-500",
  "hover:underline",
  "focus:underline",
  "active:underline",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-500",
  "focus:ring-opacity-50",
  "focus:ring-offset-2",
  "focus:ring-offset-blue-50",
]);

export type StyledLinkProps = VariantProps<typeof link>;
