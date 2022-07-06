import {styled, keyframes, VariantProps} from "../theme/stitches.config";

const pointAnimation = keyframes({
  "0%": {
    opacity: 1,
  },
  "50%": {
    opacity: "0.4",
    transform: "scale(0.5)",
  },
  "100%": {
    opacity: 1,
  },
});

export const StyledBadge = styled("span", {
  display: "inline-block",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  bg: "$$badgeBackgroundColor",
  color: "$$badgeTextColor",
  fontWeight: "$semibold",
  fontSize: "$$badgeFontSize",
  variants: {
    size: {
      xs: {
        p: "$1 $3",
        $$badgeFontSize: "0.65rem",
      },
      sm: {
        p: "$1 $4",
        $$badgeFontSize: "$fontSizes$xs",
      },
      md: {
        p: "$1 $5",
        $$badgeFontSize: "$fontSizes$sm",
      },
      lg: {
        p: "$1 $6",
        $$badgeFontSize: "$fontSizes$lg",
      },
      xl: {
        p: "$1 $7",
        $$badgeFontSize: "$fontSizes$xl",
      },
    },
    color: {
      neutral: {
        $$badgeBackgroundColor: "$colors$neutral",
        $$badgeTextColor: "$colors$neutralSolidContrast",
        $$badgeShadowColor: "$colors$neutralShadow",
      },
      primary: {
        $$badgeBackgroundColor: "$colors$primary",
        $$badgeTextColor: "$colors$primarySolidContrast",
        $$badgeShadowColor: "$colors$primaryShadow",
      },
      secondary: {
        $$badgeBackgroundColor: "$colors$secondary",
        $$badgeTextColor: "$colors$secondarySolidContrast",
        $$badgeShadowColor: "$colors$secondaryShadow",
      },
      success: {
        $$badgeBackgroundColor: "$colors$success",
        $$badgeTextColor: "$colors$successSolidContrast",
        $$badgeShadowColor: "$colors$successShadow",
      },
      warning: {
        $$badgeBackgroundColor: "$colors$warning",
        $$badgeTextColor: "$colors$warningSolidContrast",
        $$badgeShadowColor: "$colors$warningShadow",
      },
      error: {
        $$badgeBackgroundColor: "$colors$error",
        $$badgeTextColor: "$colors$errorSolidContrast",
        $$badgeShadowColor: "$colors$errorShadow",
      },
    },
    enableShadow: {
      true: {
        boxShadow: "0 2px 10px 0 $$badgeShadowColor",
      },
    },
    isSquared: {
      true: {
        borderRadius: "calc($$badgeFontSize * 0.45)",
      },
      false: {
        borderRadius: "$pill",
      },
    },
    variant: {
      default: {},
      flat: {},
      dot: {
        dflex: "center",
        minSize: "$$badgeFontSize",
        boxSizing: "border-box",
        border: "2px solid $colors$background",
        p: 0,
      },
      points: {
        p: "calc($$badgeFontSize * 0.4)",
        boxSizing: "border-box",
        border: "2px solid $colors$background",
      },
      bordered: {
        $$badgeBackgroundColor: "$background",
        bw: "$$badgeBorderWeight",
        borderStyle: "solid",
        borderColor: "$$badgeTextColor",
      },
    },
    borderWeight: {
      light: {
        $$badgeBorderWeight: "$borderWeights$light",
      },
      normal: {
        $$badgeBorderWeight: "$borderWeights$normal",
      },
      bold: {
        $$badgeBorderWeight: "$borderWeights$bold",
      },
      extrabold: {
        $$badgeBorderWeight: "$borderWeights$extrabold",
      },
      black: {
        $$badgeBorderWeight: "$borderWeights$black",
      },
    },
  },
  compoundVariants: [
    /***
     * @variant flat
     * @color {neutral, primary, secondary, success, warning, error}
     */
    // variant=flat && color=neutral
    {
      variant: "flat",
      color: "neutral",
      css: {
        $$badgeBackgroundColor: "$colors$neutralLight",
        $$badgeTextColor: "$colors$neutralLightContrast",
      },
    },
    // variant=flat && color=primary
    {
      variant: "flat",
      color: "primary",
      css: {
        $$badgeBackgroundColor: "$colors$primaryLight",
        $$badgeTextColor: "$colors$primaryLightContrast",
      },
    },
    // variant=flat && color=secondary
    {
      variant: "flat",
      color: "secondary",
      css: {
        $$badgeBackgroundColor: "$colors$secondaryLight",
        $$badgeTextColor: "$colors$secondaryLightContrast",
      },
    },
    // variant=flat && color=success
    {
      variant: "flat",
      color: "success",
      css: {
        $$badgeBackgroundColor: "$colors$successLight",
        $$badgeTextColor: "$colors$successLightContrast",
      },
    },
    // variant=flat && color=warning
    {
      variant: "flat",
      color: "warning",
      css: {
        $$badgeBackgroundColor: "$colors$warningLight",
        $$badgeTextColor: "$colors$warningLightContrast",
      },
    },
    // variant=flat && color=error
    {
      variant: "flat",
      color: "error",
      css: {
        $$badgeBackgroundColor: "$colors$errorLight",
        $$badgeTextColor: "$colors$errorLightContrast",
      },
    },
    /***
     * @variant bordered
     * @color {neutral, primary, secondary, success, warning, error}
     */
    // variant=bordered && color=neutral
    {
      variant: "bordered",
      color: "neutral",
      css: {
        $$badgeTextColor: "$colors$neutral",
      },
    },
    // variant=bordered && color=primary
    {
      variant: "bordered",
      color: "primary",
      css: {
        $$badgeTextColor: "$colors$primary",
      },
    },
    // variant=bordered && color=secondary
    {
      variant: "bordered",
      color: "secondary",
      css: {
        $$badgeTextColor: "$colors$secondary",
      },
    },
    // variant=bordered && color=success
    {
      variant: "bordered",
      color: "success",
      css: {
        $$badgeTextColor: "$colors$success",
      },
    },
    // variant=bordered && color=warning
    {
      variant: "bordered",
      color: "warning",
      css: {
        $$badgeTextColor: "$colors$warning",
      },
    },
    // variant=bordered && color=error
    {
      variant: "bordered",
      color: "error",
      css: {
        $$badgeTextColor: "$colors$error",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
    color: "neutral",
    variant: "default",
    borderWeight: "normal",
    isSquared: false,
  },
});

export const StyledBadgePoints = styled("div", {
  position: "relative",
  dflex: "center",
  "& .nextui-badge-point": {
    size: "calc($$badgeFontSize * 0.5)",
    background: "$$badgeTextColor",
    margin: "0 2px",
    borderRadius: "$pill",
    "&:nth-child(1)": {
      animation: `${pointAnimation} 1.2s ease infinite`,
    },
    "&:nth-child(2)": {
      animation: `${pointAnimation} 1.2s ease infinite 0.4s`,
    },
    "&:nth-child(3)": {
      animation: `${pointAnimation} 1.2s ease infinite 0.8s`,
    },
  },
});

export type BadgeVariantsProps = VariantProps<typeof StyledBadge>;
