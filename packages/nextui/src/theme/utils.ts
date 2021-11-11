import { NextUIThemes } from './index';
import useWarning from '../use-warning';
import { __DEV__ } from '../utils/assertion';
import { DeepPartial } from '../utils/types';
import { deepMergeObject } from '../utils/object';
import darkTheme from './dark';
import lightTheme from './light';

export type PartialTheme = DeepPartial<NextUIThemes>;

export type ThemeParam =
  | PartialTheme
  | ((theme: PartialTheme) => PartialTheme)
  | undefined;

export const mergeTheme = (
  current: NextUIThemes,
  custom: ThemeParam
): NextUIThemes => {
  if (!custom) return current;
  if (typeof custom === 'function') {
    const merged = custom(current);
    if ((!merged || typeof merged !== 'object') && __DEV__) {
      useWarning('The theme function must return object value.');
    }
    return merged as NextUIThemes;
  }
  return deepMergeObject<NextUIThemes>(current, custom as NextUIThemes);
};

export const getThemeByType = (type: NextUIThemes['type']) => {
  const themes: { [key in NextUIThemes['type']]: NextUIThemes } = {
    light: lightTheme,
    dark: darkTheme
  };
  return themes[type];
};

export const switchTheme = (mergedTheme: NextUIThemes): NextUIThemes => {
  return { ...getThemeByType(mergedTheme.type), ...mergedTheme };
};
