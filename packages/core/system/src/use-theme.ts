import {useContext} from "react";

import {ThemeContext} from "./theme-context";
import {NextUIThemeContext} from "./types";

export function useTheme() {
  const theme = useContext(ThemeContext as unknown as React.Context<undefined>);

  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`",
    );
  }

  return theme as NextUIThemeContext;
}
