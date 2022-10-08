import {styled} from "@nextui-org/system";
import {cssFocusVisible, cssNoBlurriness} from "@nextui-org/shared-css";

export const StyledCardBody = styled("div", {
  d: "flex",
  w: "100%",
  h: "auto",
  flex: "1 1 auto",
  fd: "column",
  jc: "inherit",
  ai: "inherit",
  ac: "inherit",
  py: "$lg",
  px: "$sm",
  oy: "auto",
  position: "relative",
  ta: "left",
});

export const StyledCard = styled(
  "div",
  {
    $$cardColor: "$colors$backgroundContrast",
    $$cardTextColor: "$colors$text",
    m: 0,
    p: 0,
    br: "$lg",
    bg: "$$cardColor",
    color: "$$cardTextColor",
    position: "relative",
    display: "flex",
    overflow: "hidden",
    fd: "column",
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    "@motion": {
      transition: "none",
    },
    ".nextui-image": {
      width: "100%",
    },
    ".nextui-drip": {
      zIndex: "$1",
      ".nextui-drip-filler": {
        opacity: 0.25,
        fill: "$accents6",
      },
    },
    variants: {
      variant: {
        flat: {
          bg: "$accents0",
        },
        shadow: {
          dropShadow: "$lg",
          "@safari": {
            boxShadow: "$lg",
            dropShadow: "none",
          },
        },
        bordered: {
          borderStyle: "solid",
          borderColor: "$border",
        },
      },
      borderWeight: {
        light: {
          bw: "$light",
        },
        normal: {
          bw: "$normal",
        },
        bold: {
          bw: "$bold",
        },
        extrabold: {
          bw: "$extrabold",
        },
        black: {
          bw: "$black",
        },
      },
      disableAnimation: {
        true: {
          transition: "none",
        },
        false: {
          transition: "$card",
        },
      },
      isPressable: {
        true: {
          cursor: "pointer",
          us: "none",
          WebkitTapHighlightColor: "transparent",
        },
      },
      isPressed: {
        true: {},
      },
      isHovered: {
        true: {
          dropShadow: "$lg",
          "@safari": {
            boxShadow: "$lg",
            dropShadow: "none",
          },
        },
      },
    },
    compoundVariants: [
      //  isPreseed && !disableAnimation
      {
        isPressed: true,
        disableAnimation: false,
        css: {
          transform: "scale(0.97)",
        },
      },
      // isHovered && !disableAnimation
      {
        isHovered: true,
        disableAnimation: false,
        css: {
          transform: "translateY(-2px)",
        },
      },
      // isHovered && variant === 'shadow'
      {
        isHovered: true,
        variant: "shadow",
        css: {
          dropShadow: "$xl",
          "@safari": {
            boxShadow: "$xl",
            dropShadow: "none",
          },
        },
      },
    ],
  },
  cssNoBlurriness,
  cssFocusVisible,
);

export const StyledCardHeader = styled("div", {
  w: "100%",
  display: "flex",
  flexShrink: 0,
  zIndex: "$1",
  jc: "flex-start",
  ai: "center",
  overflow: "hidden",
  color: "inherit",
  p: "$sm",
});

export const StyledCardFooter = styled("div", {
  w: "100%",
  h: "auto",
  p: "$sm",
  d: "flex",
  ai: "center",
  overflow: "hidden",
  color: "inherit",
  bblr: "$lg",
  bbrr: "$lg",
  variants: {
    isBlurred: {
      true: {
        bf: "saturate(180%) blur(10px)",
        bg: "$$cardColor",
      },
    },
  },
});
