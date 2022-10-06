import {styled} from "@nextui-org/system";
import {cssFocusVisible} from "@nextui-org/shared-css";

export const StyledSnippet = styled("div", {
  position: "relative",
  width: "initial",
  maxWidth: "100%",
  padding: "calc($space$lg * 0.75) $space$lg",
  br: "$lg",
  bg: "$background",
  variants: {
    color: {
      default: {
        $$snippetBorderColor: "$border",
        $$snippetBgColor: "$background",
        color: "$text",
      },
      primary: {
        $$snippetBorderColor: "$border",
        $$snippetBgColor: "$primary",
        color: "$text",
      },
      success: {
        $$snippetBorderColor: "$success",
        $$snippetBgColor: "$background",
        color: "$success",
      },
      warning: {
        $$snippetBorderColor: "$warning",
        $$snippetBgColor: "$background",
        color: "$warning",
      },
      error: {
        $$snippetBorderColor: "$error",
        $$snippetBgColor: "$background",
        color: "$error",
      },
      secondary: {
        $$snippetBorderColor: "$secondary",
        $$snippetBgColor: "$background",
        color: "$secondary",
      },
      invert: {
        $$snippetBorderColor: "$foreground",
        $$snippetBgColor: "$foreground",
        color: "$background",
      },
    },
    borderWeight: {
      light: {
        $$borderWeight: "$light",
      },
      normal: {
        $$borderWeight: "$normal",
      },
      bold: {
        $$borderWeight: "$bold",
      },
      extrabold: {
        $$borderWeight: "$extrabold",
      },
      black: {
        $$borderWeight: "$black",
      },
    },
    bordered: {
      true: {
        border: "$$borderWeight solid $$snippetBorderColor",
      },
    },
    filled: {
      true: {
        backgroundColor: "$$snippetBgColor",
      },
    },
  },
  defaultVariants: {
    color: "default",
    borderWeight: "normal",
    filled: false,
  },
});

export const StyledSnippetPre = styled("pre", {
  margin: 0,
  padding: 0,
  border: "none",
  br: 0,
  bgColor: "transparent",
  color: "inherit",
  fontSize: "$sm",
  "*": {
    margin: 0,
    padding: 0,
    fontSize: "inherit",
    color: "inherit",
  },
  variants: {
    withCopyButton: {
      true: {
        width: "calc(100% - 2 * $lg)",
      },
      false: {
        width: "100%",
      },
    },
  },
});

export const StyledSnippetCopyButton = styled(
  "button",
  {
    display: "inline-flex",
    jc: "center",
    border: "none",
    ai: "flex-start",
    bg: "transparent",
    width: "calc(2 * $space$lg)",
    br: "$xs",
    color: "inherit",
    transition: "opacity 0.2s ease 0s",
    cursor: "pointer",
    us: "none",
    "@motion": {
      transition: "none",
    },
    "&:hover": {
      opacity: "0.7",
    },
    svg: {
      path: {
        fill: "$accents6",
      },
    },
  },
  cssFocusVisible,
);
