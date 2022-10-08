import {styled} from "@nextui-org/system";

import {StyledButton} from "./button.styles";

export const StyledButtonGroup = styled("div", {
  display: "inline-flex",
  margin: "$3",
  backgroundColor: "transparent",
  height: "min-content",
  [`& ${StyledButton}`]: {
    ".nextui-button-text": {
      top: 0,
    },
  },
  variants: {
    size: {
      xs: {
        br: "$xs",
      },
      sm: {
        br: "$sm",
      },
      md: {
        br: "$md",
      },
      lg: {
        br: "$base",
      },
      xl: {
        br: "$xl",
      },
    },
    isVertical: {
      true: {
        fd: "column",
        [`& ${StyledButton}`]: {
          "&:not(:first-child)": {
            btlr: 0, // top-left
            btrr: 0, // top-right
          },
          "&:not(:last-child)": {
            bblr: 0,
            bbrr: 0,
          },
        },
      },
      false: {
        fd: "row",
        [`& ${StyledButton}`]: {
          "&:not(:first-child)": {
            btlr: 0, // top-left
            bblr: 0, // bottom-left
          },
          "&:not(:last-child)": {
            btrr: 0, // top-right
            bbrr: 0, // bottom-right
          },
        },
      },
    },
    isRounded: {
      true: {
        br: "$pill",
      },
    },
    isBordered: {
      true: {
        bg: "transparent",
      },
    },
    isGradient: {
      true: {
        pl: 0,
      },
    },
  },
  compoundVariants: [
    // isBordered / isVertical:true
    {
      isBordered: true,
      isVertical: true,
      css: {
        [`& ${StyledButton}`]: {
          "&:not(:last-child)": {
            borderBottom: "none",
            paddingBottom: "0",
          },
        },
      },
    },
    // isBordered / isVertical:false
    {
      isBordered: true,
      isVertical: false,
      css: {
        [`& ${StyledButton}`]: {
          "&:not(:first-child)": {
            borderLeft: "none",
          },
        },
      },
    },
    // isBordered & isVertical:false & isGradient
    {
      isBordered: true,
      isVertical: false,
      isGradient: true,
      css: {
        [`& ${StyledButton}`]: {
          "&:not(:last-child)&:not(:first-child)": {
            pl: 0,
          },
          "&:last-child": {
            pl: 0,
          },
        },
      },
    },
  ],
});
