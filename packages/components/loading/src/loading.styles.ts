import {styled} from "@nextui-org/system";

import {rotate, points, blink} from "./loading.animations";

export const StyledLoadingContainer = styled("div", {
  d: "flex",
  fd: "column",
  jc: "center",
  ai: "center",
  position: "relative",
});

export const StyledLoading = styled("span", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  size: "100%",
  dflex: "center",
  bgColor: "transparent",
  us: "none",
  variants: {
    size: {
      xs: {
        $$loadingSize: "$space$8",
        $$loadingBorder: "$space$1",
      },
      sm: {
        $$loadingSize: "$space$10",
        $$loadingBorder: "$space$1",
      },
      md: {
        $$loadingSize: "$space$12",
        $$loadingBorder: "calc($space$1 * 1.5)",
      },
      lg: {
        $$loadingSize: "$space$15",
        $$loadingBorder: "$space$2",
      },
      xl: {
        $$loadingSize: "$space$18",
        $$loadingBorder: "$space$3",
      },
    },
    type: {
      default: {
        d: "flex",
        br: "$rounded",
        position: "relative",
        size: "$$loadingSize",
        i: {
          top: "0px",
          size: "100%",
          position: "absolute",
          br: "inherit",
        },
        "._1": {
          border: "$$loadingBorder solid $$loadingColor",
          borderTop: "$$loadingBorder solid transparent",
          borderLeft: "$$loadingBorder solid transparent",
          borderRight: "$$loadingBorder solid transparent",
          animation: `${rotate} 0.8s ease infinite`,
        },
        "._2": {
          border: "$$loadingBorder dotted $$loadingColor",
          borderTop: "$$loadingBorder solid transparent",
          borderLeft: "$$loadingBorder solid transparent",
          borderRight: "$$loadingBorder solid transparent",
          animation: `${rotate} 0.8s linear infinite`,
          opacity: 0.5,
        },
        "._3": {
          display: "none",
        },
      },
      points: {
        d: "flex",
        position: "relative",
        transform: "translate(0, calc($$loadingSize * 0.6))",
        i: {
          size: "$$loadingSize",
          margin: "0 3px",
          bg: "$$loadingColor",
        },
        "._1": {
          br: "$rounded",
          animation: `${points} 0.75s ease infinite`,
        },
        "._2": {
          br: "$rounded",
          animation: `${points} 0.75s ease infinite 0.25s`,
        },
        "._3": {
          br: "$rounded",
          animation: `${points} 0.75s ease infinite 0.5s`,
        },
      },
      "points-opacity": {
        d: "flex",
        position: "relative",
        i: {
          display: "inline-block",
          size: "$$loadingSize",
          br: "$rounded",
          bg: "$$loadingColor",
          margin: "0 1px",
          animation: `${blink} 1.4s infinite both`,
        },
        "._2": {
          animationDelay: "0.2s",
        },
        "._3": {
          animationDelay: "0.4s",
        },
      },
      spinner: {},
      gradient: {
        display: "flex",
        position: "relative",
        size: "$$loadingSize",
        "._1": {
          position: "absolute",
          size: "100%",
          border: "0px",
          animation: `${rotate} 1s linear infinite`,
          top: "0px",
          br: "$rounded",
          bg: "linear-gradient(0deg, $background 33%,$$loadingColor 100%)",
        },
        "._2": {
          top: "2px",
          position: "absolute",
          size: "calc(100% - 4px)",
          border: "0px",
          bg: "$background",
          br: "$rounded",
        },
        "._3": {
          display: "none",
        },
      },
    },
  },
  compoundVariants: [
    // points-opacity & xs size
    {
      size: "xs",
      type: "points-opacity",
      css: {
        $$loadingSize: "$space$1",
      },
    },
    // points-opacity & sm size
    {
      size: "sm",
      type: "points-opacity",
      css: {
        $$loadingSize: "$space$2",
      },
    },
    // points-opacity & md size
    {
      size: "md",
      type: "points-opacity",
      css: {
        $$loadingSize: "$space$3",
      },
    },
    // points-opacity & lg size
    {
      size: "lg",
      type: "points-opacity",
      css: {
        $$loadingSize: "$space$4",
      },
    },
    // points-opacity & xl size
    {
      size: "xl",
      type: "points-opacity",
      css: {
        $$loadingSize: "$space$5",
      },
    },
    // points & xs size
    {
      size: "xs",
      type: "points",
      css: {
        $$loadingSize: "$space$1",
      },
    },
    // points & sm size
    {
      size: "sm",
      type: "points",
      css: {
        $$loadingSize: "$space$2",
      },
    },
    // points & md size
    {
      size: "md",
      type: "points",
      css: {
        $$loadingSize: "$space$3",
      },
    },
    // points & lg size
    {
      size: "lg",
      type: "points",
      css: {
        $$loadingSize: "$space$4",
      },
    },
    // points & xl size
    {
      size: "xl",
      type: "points",
      css: {
        $$loadingSize: "$space$5",
      },
    },
  ],
  defaultVariants: {
    type: "default",
  },
});

export const StyledLoadingLabel = styled("label", {
  mt: "$1",
  color: "$$labelColor",
  fontSize: "$$loadingSize",
  "*": {
    margin: 0,
  },
  variants: {
    size: {
      xs: {
        fontSize: "$space$5",
        marginTop: "$2",
      },
      sm: {
        fontSize: "$space$6",
        marginTop: "$3",
      },
      md: {
        fontSize: "$base",
        marginTop: "$4",
      },
      lg: {
        fontSize: "$space$10",
        marginTop: "$4",
      },
      xl: {
        fontSize: "$space$11",
        marginTop: "$5",
      },
    },
  },
});
