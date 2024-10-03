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
export function useTheme(defaultTheme: Theme = ThemeProps.SYSTEM) {
  const MEDIA = "(prefers-color-scheme: dark)";

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
      return window.matchMedia?.(MEDIA).matches ? ThemeProps.DARK : ThemeProps.LIGHT;
    }

    return defaultTheme;
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        const targetTheme =
          newTheme === ThemeProps.SYSTEM
            ? window.matchMedia?.(MEDIA).matches
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

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (defaultTheme === ThemeProps.SYSTEM) {
        setTheme(e.matches ? ThemeProps.DARK : ThemeProps.LIGHT);
      }
    },
    [theme, setTheme],
  );

  useEffect(() => setTheme(theme), [theme, setTheme]);

  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    media.addEventListener("change", handleMediaQuery);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  return {theme, setTheme};
}
