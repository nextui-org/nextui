import {styled, keyframes, VariantProps} from "@nextui-org/react";
import {darkTheme} from "@theme/shared";

const growAndShrink = keyframes({
  "0%": {
    transform: "scale(0)",
  },
  "50%": {
    transform: "scale(1)",
  },
  "100%": {
    transform: "scale(0)",
  },
});

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(180deg)",
  },
});

export const StyledSparkleWrapper = styled("span", {
  position: "absolute",
  display: "block",
  opacity: 0,
  transition: "opacity 0.5s ease",
  animation: `${growAndShrink} 1200ms forwards`,
  svg: {
    display: "block",
    animation: `${spin} 1250ms linear forwards`,
    path: {
      fill: "$yellow600",
      [`.${darkTheme} &`]: {
        fill: "$purple900",
      },
    },
  },
  "@motion": {
    animation: "none",
    svg: {
      animation: "none",
    },
  },
});

export const StyledSparkles = styled("div", {
  position: "relative",
  display: "inline-block",
  variants: {
    activeOnHover: {
      true: {
        "&:hover": {
          [`& ${StyledSparkleWrapper}`]: {
            opacity: 1,
          },
        },
      },
      false: {
        [`& ${StyledSparkleWrapper}`]: {
          opacity: 1,
        },
      },
    },
  },
  defaultVariants: {
    activeOnHover: false,
  },
});

export const StyledChildWrapper = styled("strong", {
  zIndex: 1,
  position: "relative",
  fontWeight: "bold",
});

export type SparkleVariantProps = VariantProps<typeof StyledSparkles>;
