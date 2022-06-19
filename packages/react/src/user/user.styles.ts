import {styled} from "../theme/stitches.config";
import {cssFocusVisible, sharedDialogPopup, cssNoBlurriness} from "../theme/shared-css";

export const StyledUser = styled(
  "div",
  {
    d: "inline-flex",
    p: "0 $sm",
    jc: "center",
    ai: "center",
    w: "max-content",
    maxWidth: "100%",
    transition: "transform 250ms ease 0ms, box-shadow 0.25s ease 0s",
    "@motion": {
      transition: "none",
    },
  },
  cssFocusVisible,
  cssNoBlurriness,
  sharedDialogPopup,
);

export const StyledUserInfo = styled("div", {
  ml: "$sm",
  d: "inline-flex",
  fd: "column",
  alignItems: "flex-start",
  whiteSpace: "nowrap",
});

export const StyledUserName = styled("span", {
  fontSize: "$sm",
  color: "$text",
  lh: "$sm",
  tt: "capitalize",
  fontWeight: "$medium",
  maxW: "$60",
  to: "ellipsis", // text overflow
  ov: "hidden", // overflow
});

export const StyledUserDesc = styled("span", {
  fontSize: "$xs",
  color: "$accents7",
  "*:first-child": {
    mt: 0,
  },
  "*:last-child": {
    mb: 0,
  },
});
