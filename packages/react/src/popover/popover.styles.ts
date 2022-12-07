import {styled, keyframes, VariantProps} from "../theme/stitches.config";
import {cssFocusVisible} from "../theme/shared-css";

export const appearanceIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateZ(0)  scale(0.95)",
  },
  "60%": {
    opacity: 0.75,
    /* Avoid blurriness */
    backfaceVisibility: "hidden",
    webkitFontSmoothing: "antialiased",
    transform: "translateZ(0) scale(1.05)",
  },
  "100%": {
    opacity: 1,
    transform: "translateZ(0) scale(1)",
  },
});

export const appearanceOut = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.5)",
  },
});

export const StyledPopoverContentContainer = styled(
  "div",
  {
    /* variables */
    $$popoverMinWidth: "$space$fit",
    $$popoverMinHeight: "$space$fit",
    $$popoverBorderRadius: "$radii$lg",
    $$popoverBackground: "$colors$backgroundContrast",
    $$popoverBoxShadow: "$shadows$md",
    $$popoverBorderColor: "$colors$border",

    boxShadow: "$$popoverBoxShadow",
    outline: "none" /* Hide focus outline */,
    overflow: "hidden auto",
    bg: "$$popoverBackground",
    /* Be a flexbox to allow a full sized content area that scrolls */
    display: "inline-flex",
    flexDirection: "column",
    boxSizing: "border-box",

    minWidth: "$$popoverMinWidth",
    minHeight: "$$popoverMinHeight",
    maxWidth: "calc(100% - $$popoverMinWidth)",
    maxHeight: "calc(100% - $$popoverMinWidth)",

    borderRadius: "$$popoverBorderRadius",

    animationFillMode: "forwards",
    willChange: "transform, opacity",
    "@motion": {
      transition: "none",
    },
    "&.nextui-popover-content-enter": {
      animationName: appearanceIn,
      animationTimingFunction: "ease-out",
      animationDirection: "normal",
      animationDuration: "300ms",
      animationFillMode: "both",
    },
    "&.nextui-popover-content-leave": {
      animationName: appearanceOut,
      animationTimingFunction: "ease-in",
      animationDuration: "60ms",
      animationFillMode: "both",
    },
    variants: {
      disableShadow: {
        true: {
          boxShadow: "none",
        },
      },
      isBordered: {
        true: {
          borderStyle: "solid",
          borderColor: "$$popoverBorderColor",
        },
      },
      borderWeight: {
        light: {
          bw: "$light",
          $$popoverBorderWeight: "$borderWeights$light",
        },
        normal: {
          bw: "$normal",
          $$popoverBorderWeight: "$borderWeights$normal",
        },
        bold: {
          bw: "$bold",
          $$popoverBorderWeight: "$borderWeights$bold",
        },
        extrabold: {
          bw: "$extrabold",
          $$popoverBorderWeight: "$borderWeights$extrabold",
        },
        black: {
          bw: "$black",
          $$popoverBorderWeight: "$borderWeights$black",
        },
      },
      disableAnimation: {
        true: {
          transition: "none",
          "&.nextui-popover-content-enter": {
            animation: "none",
          },
          "&.nextui-popover-content-leave": {
            animation: "none",
          },
        },
      },
    },
    defaultVariants: {
      isBordered: false,
      borderWeight: "light",
    },
  },
  cssFocusVisible,
);

export const StyledPopoverContent = styled("div", {});

export type PopoverContentVariantsProps = VariantProps<typeof StyledPopoverContentContainer>;
