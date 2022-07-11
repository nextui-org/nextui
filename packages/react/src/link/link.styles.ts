import {theme, styled, VariantProps} from "../theme/stitches.config";
import {cssFocusVisible} from "../theme/shared-css";
import {addColorAlpha} from "../utils/color";

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
    backgroundImage: "inherit",
    backgroundColor: "inherit",
    backgroundClip: "inherit",
    WebkitTextFillColor: "inherit",
    outline: "none",
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
          $$linkBackgroundColor: addColorAlpha(theme.colors?.link?.value, 0.2),
        },
        text: {
          color: "$text",
          $$linkBackgroundColor: addColorAlpha(theme.colors?.text?.value, 0.2),
        },
        primary: {
          color: "$primary",
          $$linkBackgroundColor: "$colors$primaryLight",
        },
        secondary: {
          color: "$secondary",
          $$linkBackgroundColor: "$colors$secondaryLight",
        },
        success: {
          color: "$success",
          $$linkBackgroundColor: "$colors$successLight",
        },
        warning: {
          color: "$warning",
          $$linkBackgroundColor: "$colors$warningLight",
        },
        error: {
          color: "$error",
          $$linkBackgroundColor: "$colors$errorLight",
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
