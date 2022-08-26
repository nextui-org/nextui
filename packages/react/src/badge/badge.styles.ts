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
  lineHeight: 1,
  display: "flex",
  flexFlow: "row wrap",
  placeContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  bg: "$$badgeBackgroundColor",
  color: "$$badgeTextColor",
  fontWeight: "$bold",
  fontSize: "$$badgeFontSize",
  p: "$$badgeVPadding $$badgeHPadding",
  "@motion": {
    animation: "none",
    transition: "none",
    "&.nextui-badge--is-invisible": {
      animation: "none",
      transition: "none",
    },
  },
  variants: {
    size: {
      xs: {
        $$badgeVPadding: "$space$2",
        $$badgeHPadding: "$space$2",
        $$badgeFontSize: "0.65rem",
      },
      sm: {
        $$badgeVPadding: "$space$2",
        $$badgeHPadding: "$space$3",
        $$badgeFontSize: "0.73rem",
      },
      md: {
        $$badgeVPadding: "$space$3",
        $$badgeHPadding: "$space$4",
        $$badgeFontSize: "$fontSizes$xs",
      },
      lg: {
        $$badgeVPadding: "$space$4",
        $$badgeHPadding: "$space$5",
        $$badgeFontSize: "$fontSizes$base",
      },
      xl: {
        $$badgeVPadding: "$space$5",
        $$badgeHPadding: "$space$6",
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
        position: "absolute",
        lineHeight: 1.5,
      },
    },
    isOneChar: {
      true: {},
    },
    color: {
      default: {
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
        "&.nextui-badge--is-invisible": {
          opacity: 0,
          animation: `${appearanceOutTopRight} 0.2s ease-in`,
        },
      },
      "top-left": {
        animation: `${appearanceInTopLeft} 0.25s ease-out`,
        "&.nextui-badge--is-invisible": {
          opacity: 0,
          animation: `${appearanceOutTopLeft} 0.2s ease-in`,
        },
      },
      "bottom-right": {
        animation: `${appearanceInBottomRight} 0.25s ease-out`,
        "&.nextui-badge--is-invisible": {
          opacity: 0,
          animation: `${appearanceOutBottomRight} 0.2s ease-in`,
        },
      },
      "bottom-left": {
        animation: `${appearanceInBottomLeft} 0.25s ease-out`,
        "&.nextui-badge--is-invisible": {
          opacity: 0,
          animation: `${appearanceOutBottomLeft} 0.2s ease-in`,
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
      true: {
        border: "2px solid transparent",
      },
      false: {
        border: "2px solid $colors$background",
      },
    },
    disableAnimation: {
      true: {
        animation: "none",
        transition: "none",
        "&.nextui-badge--is-invisible": {
          animation: "none",
          transition: "none",
        },
      },
    },
  },
  compoundVariants: [
    /***
     * @variant flat
     * @color {default, primary, secondary, success, warning, error}
     */
    // variant=flat && color=default
    {
      variant: "flat",
      color: "default",
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
     * @color {default, primary, secondary, success, warning, error}
     */
    // variant=bordered && color=default
    {
      variant: "bordered",
      color: "default",
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
        top: "calc(15% + $$badgePlacementVOffset)",
        right: "calc(15% + $$badgePlacementHOffset)",
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
        top: "calc(15% + $$badgePlacementVOffset)",
        left: "calc(15% + $$badgePlacementHOffset)",
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
        bottom: "calc(15% + $$badgePlacementVOffset)",
        right: "calc(15% + $$badgePlacementHOffset)",
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
        bottom: "calc(15% + $$badgePlacementVOffset)",
        left: "calc(15% + $$badgePlacementHOffset)",
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
    /**
     * @isOneChar {true, false}
     * @asChild {true, false}
     */
    {
      isOneChar: true,
      asChild: true,
      css: {
        p: 0,
        size: "calc($$badgeFontSize + $$badgeHPadding)",
      },
    },
    {
      isOneChar: false,
      asChild: true,
      css: {
        $$badgeVPadding: "0px",
        $$badgeHPadding: "$space$2",
      },
    },
    /**
     * @isOneChar false
     * @asChild true
     * @size {md, lg, xl}
     */
    // size = md
    {
      isOneChar: false,
      asChild: true,
      size: "md",
      css: {
        $$badgeHPadding: "$space$3",
      },
    },
    // size = lg
    {
      isOneChar: false,
      asChild: true,
      size: "lg",
      css: {
        $$badgeHPadding: "$space$4",
      },
    },
    // size = xl
    {
      isOneChar: false,
      asChild: true,
      size: "xl",
      css: {
        $$badgeHPadding: "$space$5",
      },
    },
    /**
     * @disableOutline true
     * @variant bordered
     */
    {
      disableOutline: true,
      variant: "bordered",
      css: {
        borderColor: "$$badgeTextColor",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    color: "default",
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
