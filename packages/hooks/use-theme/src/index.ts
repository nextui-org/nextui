import {useEffect, useMemo, useState} from "react";

// constant properties for Theme
export const ThemeProps = {
  // localStorage key for storing the current theme
  KEY: "nextui-theme",
  // value for light theme
  LIGHT: "light",
  // value for dark theme
  DARK: "dark",
} as const;

// type definition for Theme using the specific light or dark strings
export type Theme = typeof ThemeProps.LIGHT | typeof ThemeProps.DARK;

/**
 * React hook to switch between light and dark themes
 *
 * @param defaultTheme the default theme (i.e. light or dark)
 * @returns An object containing the current theme and theme manipulation functions
 */
export function useTheme(defaultTheme?: Theme) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(ThemeProps.KEY) as Theme | null;

    return storedTheme || (defaultTheme ?? ThemeProps.LIGHT);
  });

  const isDarkTheme = useMemo(() => {
    return theme === ThemeProps.DARK;
  }, [theme]);

  const isLightTheme = useMemo(() => {
    return theme === ThemeProps.LIGHT;
  }, [theme]);

  const _setTheme = (theme: Theme) => {
    localStorage.setItem(ThemeProps.KEY, theme);
    document.documentElement.classList.remove(ThemeProps.LIGHT, ThemeProps.DARK);
    document.documentElement.classList.add(theme);
    setTheme(theme);
  };

  const setLightTheme = () => _setTheme(ThemeProps.LIGHT);

  const setDarkTheme = () => _setTheme(ThemeProps.DARK);

  const toggleTheme = () => (theme === ThemeProps.DARK ? setLightTheme() : setDarkTheme());

  useEffect(() => _setTheme(theme), [theme]);

  return {theme, isDarkTheme, isLightTheme, setLightTheme, setDarkTheme, toggleTheme};
}
