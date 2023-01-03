import {styled, keyframes, VariantProps} from "../theme/stitches.config";

const indeterminateAnimation = keyframes({
  "0%": {
    left: "-40%",
  },
  "100%": {
    left: "100%",
  },
});

export const StyledProgress = styled("div", {
  margin: 0,
  padding: 0,
  width: "100%",
  position: "relative",
  overflow: "hidden",
  variants: {
    color: {
      default: {
        $$progressColor: "$colors$primary",
        $$progressShadowColor: "$colors$primaryShadow",
      },
      primary: {
        $$progressColor: "$colors$primary",
        $$progressShadowColor: "$colors$primaryShadow",
      },
      secondary: {
        $$progressColor: "$colors$secondary",
        $$progressShadowColor: "$colors$secondaryShadow",
      },
      success: {
        $$progressColor: "$colors$success",
        $$progressShadowColor: "$colors$successShadow",
      },
      warning: {
        $$progressColor: "$colors$warning",
        $$progressShadowColor: "$colors$warningShadow",
      },
      error: {
        $$progressColor: "$colors$error",
        $$progressShadowColor: "$colors$errorShadow",
      },
      gradient: {
        $$progressColor: "$colors$gradient",
        $$progressShadowColor: "$colors$primaryShadow",
      },
    },
    status: {
      default: {
        bg: "$accents2",
      },
      primary: {
        bg: "$primaryLight",
      },
      secondary: {
        bg: "$secondaryLight",
      },
      success: {
        bg: "$successLight",
      },
      warning: {
        bg: "$warningLight",
      },
      error: {
        bg: "$errorLight",
      },
    },
    size: {
      xs: {
        $$progressHeight: "$space$2",
        height: "$$progressHeight",
        br: "$$progressHeight",
      },
      sm: {
        $$progressHeight: "$space$4",
        height: "$$progressHeight",
        br: "$$progressHeight",
      },
      md: {
        $$progressHeight: "$space$8",
        height: "$$progressHeight",
        br: "$$progressHeight",
      },
      lg: {
        $$progressHeight: "$space$10",
        height: "$$progressHeight",
        br: "$$progressHeight",
      },
      xl: {
        $$progressHeight: "$space$11",
        height: "$$progressHeight",
        br: "$$progressHeight",
      },
    },
    indeterminated: {
      true: {
        overflow: "hidden",
      },
    },
    squared: {
      true: {
        br: "calc($$progressHeight * 0.25)",
      },
    },
  },
  defaultVariants: {
    color: "default",
    status: "default",
    size: "md",
  },
});

export const StyledProgressBar = styled("div", {
  margin: 0,
  padding: 0,
  width: 0,
  opacity: 0,
  height: "100%",
  minWidth: "inherit",
  bg: "$$progressColor",
  br: "inherit",
  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  "@motion": {
    transition: "none",
  },
  variants: {
    animated: {
      false: {
        transition: "none",
      },
    },
    shadow: {
      true: {
        normalShadowVar: "$$progressShadowColor",
      },
    },
    striped: {
      true: {
        backgroundImage:
          "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%, transparent)",
        backgroundSize: "$space$lg $space$lg",
      },
    },
    indeterminated: {
      true: {
        position: "absolute",
        width: "0%",
        transitionProperty:
          "background-color, width, left, border-color,opacity, shadow, transform",
        transitionDuration: "300ms",
        willChange: "left",
        minWidth: "50%",
        animation: `1s ease 0s infinite normal none running ${indeterminateAnimation}`,
      },
    },
  },
});

export type ProgressVariantsProps = VariantProps<typeof StyledProgress>;
