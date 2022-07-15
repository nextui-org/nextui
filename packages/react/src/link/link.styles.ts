import {styled, VariantProps} from "../theme/stitches.config";
import {cssFocusVisible} from "../theme/shared-css";

export const StyledLinkIcon = styled("svg", {
  ml: "$1",
  as: "center",
  display: "flex",
  color: "currentColor",
});

export const StyledLink = styled(
  "a",
  {
    display: "flex",
    alignItems: "center",
    lineHeight: "inherit",
    textDecoration: "none",
    width: "fitContent",
    backgroundColor: "transparent",
    backgroundImage: "inherit",
    backgroundClip: "inherit",
    WebkitTextFillColor: "inherit",
    outline: "none",
    maxW: "max-content",
    "&:hover": {
      opacity: 0.8,
    },
    "@motion": {
      transition: "none",
    },
    variants: {
      color: {
        inherit: {
          color: "inherit",
        },
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
          "&:hover": {
            backgroundColor: "$$linkBackgroundColor",
          },
        },
      },
      animated: {
        true: {
          transition: "opacity 0.25s ease 0s, box-shadow 0.25s ease 0s",
        },
      },
    },
    compoundVariants: [
      /**
       * @block true
       * @animated true
       */
      {
        block: true,
        animated: true,
        css: {
          transition: "opacity 0.25s ease 0s, box-shadow 0.25s ease 0s, background 0.25s ease 0s",
          "@motion": {
            transition: "none",
          },
        },
      },
    ],
    defaultVariants: {
      color: "default",
      animated: true,
    },
  },
  cssFocusVisible,
);

export type LinkVariantsProps = VariantProps<typeof StyledLink>;

export default StyledLink;
