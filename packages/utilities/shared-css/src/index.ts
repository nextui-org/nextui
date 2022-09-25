import type {CSS} from "@nextui-org/system";

export const sharedFocus: CSS = {
  WebkitTapHighlightColor: "transparent",
  "&:focus:not(&:focus-visible)": {
    boxShadow: "none",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px $colors$background, 0 0 0 4px $colors$primary",
  },
  "@safari": {
    WebkitTapHighlightColor: "transparent",
    outline: "none",
  },
};

export const cssFocusVisible: CSS = {
  variants: {
    isFocusVisible: {
      true: {
        outline: "transparent solid 2px",
        outlineOffset: "2px",
        boxShadow: "0 0 0 2px $colors$background, 0 0 0 4px $colors$primary",
      },
      false: {
        outline: "none",
      },
    },
  },
};

export const cssNoBlurriness: CSS = {
  /* Avoid blurriness */
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
};

export const sharedVisuallyHidden: CSS = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
};

export const cssHideIn: CSS = {
  variants: {
    hideIn: {
      xs: {
        "@xsMax": {
          display: "none",
        },
      },
      sm: {
        "@smMax": {
          display: "none",
        },
      },
      md: {
        "@mdMax": {
          display: "none",
        },
      },
      lg: {
        "@lgMax": {
          display: "none",
        },
      },
      xl: {
        "@xlMax": {
          display: "none",
        },
      },
    },
  },
};

export const cssShowIn: CSS = {
  variants: {
    showIn: {
      xs: {
        "@xs": {
          display: "none",
        },
      },
      sm: {
        "@sm": {
          display: "none",
        },
      },
      md: {
        "@md": {
          display: "none",
        },
      },
      lg: {
        "@lg": {
          display: "none",
        },
      },
      xl: {
        "@xl": {
          display: "none",
        },
      },
    },
  },
};

export const cssHideShowIn: CSS = {...cssHideIn, ...cssShowIn};
