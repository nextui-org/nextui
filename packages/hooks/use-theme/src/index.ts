import {useCallback, useEffect, useState} from "react";

// constant properties for Theme
export const ThemeProps = {
  // localStorage key for storing the current theme
  KEY: "nextui-theme",
  // system theme: light
  LIGHT: "light",
  // system theme: dark
  DARK: "dark",
} as const;

// type definition for Theme using system theme names or custom theme names
export type customTheme = string;
export type Theme = typeof ThemeProps.LIGHT | typeof ThemeProps.DARK | customTheme;

/**
 * React hook to switch between themes
 *
 * @param defaultTheme the default theme name (e.g. light, dark, purple-dark and etc)
 * @returns An object containing the current theme and theme manipulation functions
 */
export function useTheme(defaultTheme?: Theme) {
  const [theme, setThemeState] = useState<Theme>(() => {
    let storedTheme: Theme | undefined;

    try {
      storedTheme = localStorage.getItem(ThemeProps.KEY) || undefined;
    } catch {}

    return storedTheme || (defaultTheme ?? ThemeProps.LIGHT);
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(ThemeProps.KEY, newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        setThemeState(newTheme);
      } catch {}
    },
    [theme],
  );

  useEffect(() => setTheme(theme), [theme, setTheme]);

  return {theme, setTheme};
}
