import {LayoutTheme} from "./types";

export const defaultLayout: LayoutTheme = {
  spacingUnit: 4,
  disabledOpacity: ".5",
  dividerWeight: "1px",
  fontSize: {
    tiny: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
  },
  lineHeight: {
    tiny: "1rem",
    small: "1.25rem",
    medium: "1.5rem",
    large: "1.75rem",
  },
  radius: {
    small: "8px",
    medium: "12px",
    large: "14px",
  },
  borderWidth: {
    small: "1px",
    medium: "2px",
    large: "3px",
  },
  boxShadow: {
    small:
      "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    medium:
      "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    large:
      "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
  },
};

export const lightLayout: LayoutTheme = {
  hoverOpacity: ".8",
};

export const darkLayout: LayoutTheme = {
  hoverOpacity: ".9",
  boxShadow: {
    small:
      "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
    medium:
      "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
    large:
      "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
  },
};
