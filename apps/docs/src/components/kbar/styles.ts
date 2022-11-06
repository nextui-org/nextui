import {NextUITheme} from "@nextui-org/react";

export default function generateStyles(theme?: NextUITheme) {
  return {
    container: {
      maxWidth: "500px",
      width: "100%",
      background: theme?.colors?.accents1?.value,
      color: theme?.colors?.text?.value,
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: theme?.shadows?.md?.value,
    },
    result: {
      maxHeight: 400,
      paddingBottom: "8px",
      overflow: "auto",
    },
  };
}
