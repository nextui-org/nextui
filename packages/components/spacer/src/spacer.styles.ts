import {styled} from "@nextui-org/system";

export const StyledSpacer = styled("span", {
  size: "1px",
  variants: {
    inline: {
      true: {
        display: "inline-block",
      },
      false: {
        display: "block",
      },
    },
  },
});
