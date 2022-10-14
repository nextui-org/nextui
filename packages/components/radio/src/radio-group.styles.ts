import {styled} from "@nextui-org/system";

import {StyledRadio} from "./radio.styles";

export const StyledRadioGroupContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  variants: {
    isRow: {
      true: {
        mt: 0,
        flexDirection: "row",
        [`& ${StyledRadio}:not(:last-child)`]: {
          mr: "$$radioSize",
        },
      },
      false: {
        mr: 0,
        flexDirection: "column",
        [`& ${StyledRadio}:not(:first-child)`]: {
          mt: "$$radioSize",
        },
      },
    },
  },
});

export const StyledRadioGroup = styled("div", {
  border: 0,
  margin: 0,
  padding: 0,
  display: "flex",
  fd: "column",
  variants: {
    size: {
      xs: {
        $$radioGroupGap: "$space$7",
      },
      sm: {
        $$radioGroupGap: "$space$8",
      },
      md: {
        $$radioGroupGap: "$space$9",
      },
      lg: {
        $$radioGroupGap: "$space$10",
      },
      xl: {
        $$radioGroupGap: "$space$11",
      },
    },
  },
});

export const StyledRadioGroupLabel = styled("label", {
  d: "block",
  fontWeight: "$normal",
  fontSize: "calc($$checkboxSize * 0.9)",
  color: "$accents8",
  mb: "$3",
});
