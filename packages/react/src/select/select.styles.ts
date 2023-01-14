import {Item} from "react-stately";

import {styled, VariantProps} from "../theme/stitches.config";

export const StyledSelectMenu = styled("ul", {
  $$dropdownItemHeight: "$space$13",
  $$dropdownMenuPadding: "$space$4",
  $$dropdownMenuWidth: "250px",
  $$dropdownMenuMinWidth: "250px",
  listStyle: "none",
  position: "relative",
  maxWidth: "$$dropdownMenuWidth",
  minWidth: "$$dropdownMenuMinWidth",
  width: "100%",
  p: "$$dropdownMenuPadding",
  m: 0,
  outline: "none",
});

export const StyledSelectOption = styled(
  "li",
  {
    $$dropdownItemPressedScale: 0.9,
    transition: "all 100ms ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "$space$4",
    cursor: "pointer",
    borderRadius: "$rounded",
    $$dropdownItemBorderRadius: "$radii$sm",
    br: "$$dropdownItemBorderRadius",
    "&:hover": {
      backgroundColor: "$gray100",
    },
    "&:active": {
      transform: "scale($$dropdownItemPressedScale)",
    },
  },
  {
    variants: {
      isSelected: {
        true: {
          backgroundColor: "$primary100",
        },
      },
      isFocused: {
        true: {
          backgroundColor: "$gray100",
        },
      },
      isDisabled: {
        true: {
          cursor: "not-allowed",
          opacity: 0.5,
        },
      },
    },
  },
);
