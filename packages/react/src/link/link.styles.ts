import {theme, styled, VariantProps} from "../theme/stitches.config";
import {addColorAlpha} from "../utils/color";

export const StyledLinkIcon = styled("svg", {
  ml: "$1",
  as: "center",
  display: "flex",
  color: "currentColor",
});

export const StyledLink = styled("a", {
  display: "flex",
  alignItems: "center",
  lineHeight: "inherit",
  textDecoration: "none",
  width: "fitContent",
  backgroundImage: "inherit",
  backgroundColor: "inherit",
  backgroundClip: "inherit",
  WebkitTextFillColor: "inherit",
  "&:hover": {
    opacity: 0.8,
  },
  "@motion": {
    transition: "none",
  },
  variants: {
    color: {
      default: {
        color: "$link",
      },
      text: {
        color: "$text",
      },
      primary: {
        color: "$primary",
      },
      secondary: {
        color: "$secondary",
      },
      success: {
        color: "$success",
      },
      warning: {
        color: "$warning",
      },
      error: {
        color: "$error",
      },
    },
    underline: {
      true: {
        "&:hover, &:active, &:focus": {
          textDecoration: "underline",
        },
      },
    },
    block: {
      true: {
        padding: "$2 $4",
        borderRadius: "$base",
      },
    },
    animated: {
      true: {
        transition: "$link",
      },
    },
  },
  compoundVariants: [
    {
      color: "default",
      block: true,
      css: {
        "&:hover": {
          backgroundColor: addColorAlpha(theme.colors?.link?.value, 0.2),
        },
      },
    },
    {
      color: "primary",
      block: true,
      css: {
        "&:hover": {
          backgroundColor: "$primaryLight",
        },
      },
    },
    {
      color: "secondary",
      block: true,
      css: {
        "&:hover": {
          backgroundColor: "$secondaryLight",
        },
      },
    },
    {
      color: "success",
      block: true,
      css: {
        "&:hover": {
          backgroundColor: "$successLight",
        },
      },
    },
    {
      color: "warning",
      block: true,
      css: {
        "&:hover": {
          backgroundColor: "$warningLight",
        },
      },
    },
    {
      color: "error",
      block: true,
      css: {
        "&:hover": {
          backgroundColor: "$errorLight",
        },
      },
    },
  ],
  defaultVariants: {
    color: "default",
    animated: true,
  },
});

export type LinkVariantsProps = VariantProps<typeof StyledLink>;

export default StyledLink;
