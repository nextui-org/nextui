import {styled, VariantProps} from "@nextui-org/system";

export const StyledCol = styled("div", {
  float: "left",
  boxSizing: "border-box",
  pl: "calc($$rowGap / 2)",
  pr: "calc($$rowGap / 2)",
});

export type ColVariantsProps = VariantProps<typeof StyledCol>;
