import {styled, VariantProps} from "../theme/stitches.config";

export const StyledRow = styled("div", {
  display: "flex",
  position: "relative",
  boxSizing: "border-box",
  variants: {
    fluid: {
      true: {
        width: "100%",
      },
    },
  },
  defaultVariants: {
    fluid: true,
  },
});

export type RowVariantsProps = VariantProps<typeof StyledRow>;

export default StyledRow;
