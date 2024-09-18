import {useCallback, useEffect, useState} from "react";

// constant properties for Theme
export const ThemeProps = {
  // localStorage key for storing the current theme
  KEY: "nextui-theme",
  // light theme
  LIGHT: "light",
  // dark theme
  DARK: "dark",
  // system theme
  SYSTEM: "system",
} as const;

// type definition for Theme using system theme names or custom theme names
export type customTheme = string;
export type Theme =
  | typeof ThemeProps.LIGHT
  | typeof ThemeProps.DARK
  | typeof ThemeProps.SYSTEM
  | customTheme;

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

    // return stored theme if it is selected previously
    if (storedTheme) return storedTheme;

    // if it is using system theme, check `prefers-color-scheme` value
    // return light theme if not specified
    if (defaultTheme === ThemeProps.SYSTEM) {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ThemeProps.DARK
        : ThemeProps.LIGHT;
    }

    // return default theme with light theme as default one
    return defaultTheme ?? ThemeProps.LIGHT;
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        const targetTheme =
          newTheme === ThemeProps.SYSTEM
            ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
              ? ThemeProps.DARK
              : ThemeProps.LIGHT
            : newTheme;

        localStorage.setItem(ThemeProps.KEY, targetTheme);

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(targetTheme);
        setThemeState(newTheme);
      } catch {}
    },
    [theme],
  );

  useEffect(() => setTheme(theme), [theme, setTheme]);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (theme === ThemeProps.SYSTEM) {
      setTheme(event.matches ? ThemeProps.DARK : ThemeProps.LIGHT);
    }
  });

  return {theme, setTheme};
}
