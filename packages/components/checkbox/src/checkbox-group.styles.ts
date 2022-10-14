import {styled} from "@nextui-org/system";

import {StyledCheckbox} from "./checkbox.styles";

export const StyledCheckboxGroupContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  variants: {
    isRow: {
      true: {
        flexDirection: "row",
        mt: 0,
        [`& ${StyledCheckbox}`]: {
          mr: "$$checkboxSize",
        },
      },
      false: {
        mr: 0,
        flexDirection: "column",
        [`& ${StyledCheckbox}:not(:first-child)`]: {
          mt: "$$checkboxSize",
        },
      },
    },
  },
});

export const StyledCheckboxGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  "& .nextui-checkbox-group-label": {
    d: "block",
    fontWeight: "$normal",
    fontSize: "calc($$checkboxSize * 0.8)",
    color: "$accents7",
    mb: "$3",
  },
  variants: {
    size: {
      xs: {
        $$checkboxSize: "$space$7",
      },
      sm: {
        $$checkboxSize: "$space$8",
      },
      md: {
        $$checkboxSize: "$space$9",
      },
      lg: {
        $$checkboxSize: "$space$10",
      },
      xl: {
        $$checkboxSize: "$space$11",
      },
    },
    isDisabled: {
      true: {
        "& .nextui-checkbox-group-label": {
          color: "$accents5",
        },
      },
    },
  },
});
