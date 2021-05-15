import { NextUIThemes } from './index';
import useWarning from '@hooks/use-warning';
import { DeepPartial } from '@utils/types';
import { deepMergeObject } from '@utils/object';
import darkTheme from './dark';
import lightTheme from './default';

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
    if (!merged || typeof merged !== 'object') {
      useWarning('The theme function must return object value.');
    }
    return merged as NextUIThemes;
  }
  return deepMergeObject<NextUIThemes>(current, custom as NextUIThemes);
};

export const switchTheme = (mergedTheme: NextUIThemes): NextUIThemes => {
  const themes: { [key in NextUIThemes['type']]: NextUIThemes } = {
    light: lightTheme,
    dark: darkTheme,
  };
  return { ...mergedTheme, ...themes[mergedTheme.type] };
};
