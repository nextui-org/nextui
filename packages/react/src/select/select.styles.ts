import {Item} from "react-stately";

import {styled, VariantProps} from "../theme/stitches.config";

export const StyledSelectOption = styled(
  Item,
  {
    $$dropdownItemPressedScale: 0.9,
    transition: "all 100ms ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "$2",
    cursor: "pointer",
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
