import {styled} from "@nextui-org/system";
import {cssFocusVisible} from "@nextui-org/shared-css";

export const StyledCollapse = styled("div", {
  width: "100%",
  maxWidth: "400px",
  display: "block",
  listStyle: "none",
  padding: "0",
  margin: "0",
});

export const StyledCollapseItem = styled("div", {
  zIndex: "inherit",
  position: "relative",
  display: "list-item",
  margin: "0",
  marginBottom: "$4",
  borderBottom: "#333333 solid transparent",
  "&:first-of-type": {
    borderTop: "#333333 solid transparent",
  },
  ".collapse-item-heading": {
    margin: 0,
  },
  ".collapse-item-indicator": {
    marginLeft: "8px",
  },
  ".collapse-item-content": {
    display: "none",
    background: "red",
    padding: "6px 10px 10px",
  },
  variants: {
    isOpen: {
      true: {
        ".collapse-item-content": {
          display: "block",
        },
      },
    },
    isSelectable: {},
    isDisabled: {
      true: {},
    },
  },
});

export const StyledCollapseItemHeading = styled("h2", {});

export const StyledCollapseItemButton = styled(
  "button",
  {
    width: "100%",
    display: "flex",
    appearance: "none",
    alignItems: "center",
    padding: "$4 $6",
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  cssFocusVisible,
);

export const StyledCollapseItemTitle = styled("div", {
  flex: "1 1 0%",
  textAlign: "left",
});

export const StyledCollapseItemIndicator = styled("span", {
  flexShrink: 0,
  variants: {
    isOpen: {
      true: {
        svg: {
          transform: "rotateZ(-90deg)",
        },
      },
      false: {
        svg: {
          transform: "rotateZ(0deg)",
        },
      },
    },
  },
});
