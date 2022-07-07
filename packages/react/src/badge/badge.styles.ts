import {styled, VariantProps} from "../theme/stitches.config";

import {
  pointAnimation,
  appearanceInTopRight,
  appearanceOutTopRight,
  appearanceInTopLeft,
  appearanceOutTopLeft,
  appearanceInBottomRight,
  appearanceOutBottomRight,
  appearanceInBottomLeft,
  appearanceOutBottomLeft,
} from "./badge.animations";

export const StyledBadgeRoot = styled("span", {
  d: "inline-flex",
  flexShrink: 0,
  verticalAlign: "middle",
  position: "relative",
  overflow: "visible",
});

export const StyledBadge = styled("span", {
  $$badgePlacementHOffset: "0%",
  $$badgePlacementVOffset: "0%",
  display: "inline-block",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  bg: "$$badgeBackgroundColor",
  color: "$$badgeTextColor",
  fontWeight: "$semibold",
  fontSize: "$$badgeFontSize",
  p: "$1 $$badgeHPadding",
  "@motion": {
    animation: "none",
    transition: "none",
    "&.nextui-badge--invisible": {
      animation: "none",
      transition: "none",
    },
  },
  variants: {
    size: {
      xs: {
        $$badgeHPadding: "$space$3",
        $$badgeFontSize: "0.65rem",
      },
      sm: {
        $$badgeHPadding: "$space$4",
        $$badgeFontSize: "$fontSizes$xs",
      },
      md: {
        $$badgeHPadding: "$space$4",
        $$badgeFontSize: "$fontSizes$sm",
      },
      lg: {
        $$badgeHPadding: "$space$5",
        $$badgeFontSize: "$fontSizes$lg",
      },
      xl: {
        $$badgeHPadding: "$space$5",
        $$badgeFontSize: "$fontSizes$xl",
      },
    },
    shape: {
      circle: {},
      rectangle: {},
    },
    asChild: {
      true: {
        zIndex: "$2",
        dflex: "center",
        position: "absolute",
      },
    },
    isOneChar: {
      true: {
        size: "calc($$badgeFontSize + $$badgeHPadding)",
        p: "calc($$badgeHPadding + 1px)",
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
    placement: {
      "top-right": {
        animation: `${appearanceInTopRight} 0.25s ease-out`,
        "&.nextui-badge--invisible": {
          opacity: 0,
          animation: `${appearanceOutTopRight} 0.25s ease-in`,
        },
      },
      "top-left": {
        animation: `${appearanceInTopLeft} 0.25s ease-out`,
        "&.nextui-badge--invisible": {
          opacity: 0,
          animation: `${appearanceOutTopLeft} 0.25s ease-in`,
        },
      },
      "bottom-right": {
        animation: `${appearanceInBottomRight} 0.25s ease-out`,
        "&.nextui-badge--invisible": {
          opacity: 0,
          animation: `${appearanceOutBottomRight} 0.25s ease-in`,
        },
      },
      "bottom-left": {
        animation: `${appearanceInBottomLeft} 0.25s ease-out`,
        "&.nextui-badge--invisible": {
          opacity: 0,
          animation: `${appearanceOutBottomLeft} 0.25s ease-in`,
        },
      },
    },
    variant: {
      default: {},
      flat: {},
      dot: {
        p: 0,
        dflex: "center",
        minSize: "$$badgeFontSize",
        boxSizing: "border-box",
      },
      points: {
        p: "calc($$badgeFontSize * 0.4)",
        boxSizing: "border-box",
        $$badgePlacementHOffset: "calc($$badgeFontSize * 0.8)",
      },
      bordered: {
        $$badgeBackgroundColor: "$colors$background",
        bg: "$background",
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
    disableOutline: {
      false: {
        border: "2px solid $colors$background",
      },
    },
    disableAnimation: {
      true: {
        animation: "none",
        transition: "none",
        "&.nextui-badge--invisible": {
          animation: "none",
          transition: "none",
        },
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
    /***
     * @asChild true
     * @shape {rectangle, circle}
     * @placement {top-right, top-left, bottom-right, bottom-left}
     */
    // placement=top-right && shape=rectangle
    {
      asChild: true,
      shape: "rectangle",
      placement: "top-right",
      css: {
        top: "calc(5% + $$badgePlacementVOffset)",
        right: "calc(5% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(50%, -50%)",
        transformOrigin: "100% 0%",
      },
    },
    // placement=top-left && shape=rectangle
    {
      asChild: true,
      shape: "rectangle",
      placement: "top-left",
      css: {
        top: "calc(5% + $$badgePlacementVOffset)",
        left: "calc(5% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(-50%, -50%)",
        transformOrigin: "0% 0%",
      },
    },
    // placement=bottom-right && shape=rectangle
    {
      asChild: true,
      shape: "rectangle",
      placement: "bottom-right",
      css: {
        bottom: "calc(5% + $$badgePlacementVOffset)",
        right: "calc(5% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(50%, 50%)",
        transformOrigin: "100% 100%",
      },
    },
    // placement=bottom-left && shape=rectangle
    {
      asChild: true,
      shape: "rectangle",
      placement: "bottom-left",
      css: {
        bottom: "calc(5% + $$badgePlacementVOffset)",
        left: "calc(5% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(-50%, 50%)",
        transformOrigin: "0% 100%",
      },
    },
    // placement=top-right && shape=circle
    {
      asChild: true,
      shape: "circle",
      placement: "top-right",
      css: {
        top: "calc(14% + $$badgePlacementVOffset)",
        right: "calc(14% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(50%, -50%)",
        transformOrigin: "100% 0%",
      },
    },
    // placement=top-left && shape=circle
    {
      asChild: true,
      shape: "circle",
      placement: "top-left",
      css: {
        top: "calc(14% + $$badgePlacementVOffset)",
        left: "calc(14% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(-50%, -50%)",
        transformOrigin: "0% 0%",
      },
    },
    // placement=bottom-right && shape=circle
    {
      asChild: true,
      shape: "circle",
      placement: "bottom-right",
      css: {
        bottom: "calc(14% + $$badgePlacementVOffset)",
        right: "calc(14% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(50%, 50%)",
        transformOrigin: "100% 100%",
      },
    },
    // placement=bottom-left && shape=circle
    {
      asChild: true,
      shape: "circle",
      placement: "bottom-left",
      css: {
        bottom: "calc(14% + $$badgePlacementVOffset)",
        left: "calc(14% + $$badgePlacementHOffset)",
        transform: "scale(1) translate(-50%, 50%)",
        transformOrigin: "0% 100%",
      },
    },
    /**
     * @variant dot
     * @shape rectangle
     */
    {
      variant: "dot",
      shape: "rectangle",
      css: {
        $$badgePlacementHOffset: "calc($$badgeFontSize * 0.2)",
        $$badgePlacementVOffset: "calc($$badgeFontSize * 0.1)",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
    color: "neutral",
    variant: "default",
    borderWeight: "normal",
    placement: "top-right",
    shape: "rectangle",
    enableShadow: false,
    disableOutline: false,
    isSquared: false,
  },
});

export const StyledBadgePoints = styled("div", {
  position: "relative",
  dflex: "center",
  "& .nextui-badge-point": {
    size: "calc($$badgeFontSize * 0.3)",
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
