import { getCodeThemeColors } from '../playground/code-theme';
import { SandpackTheme } from '@codesandbox/sandpack-react';
import { get } from 'lodash';

const themeColors = getCodeThemeColors();

export const nextuiTheme: SandpackTheme = {
  palette: {
    activeText: get(themeColors, 'color', '#F4F4F4'),
    defaultText: get(themeColors, 'commentColor.style.color', '#999'),
    inactiveText: '#e4e7eb',
    activeBackground: '#A258DF2b',
    defaultBackground: get(themeColors, 'backgroundColor', '#363449'),
    inputBackground: '#ffffff',
    accent: '#A258DF',
    errorBackground: '#ffcdca',
    errorForeground: '#811e18'
  },
  syntax: {
    plain: get(themeColors, 'color', '#151515'),
    comment: {
      color: get(themeColors, 'commentColor.style.color', '#999'),
      fontStyle: 'italic'
    },
    keyword: get(themeColors, 'primitiveColor.style.color', '#0971F1'),
    tag: get(themeColors, 'classnameColor.style.color', '#0971F1'),
    punctuation: get(themeColors, 'color', '#151515'),
    definition: get(themeColors, 'color', '#151515'),
    property: get(themeColors, 'color', '#151515'),
    static: get(themeColors, 'attrColor.style.color', '#FF453A'),
    string: get(themeColors, 'stringColor.style.color', '#BF5AF2')
  },
  typography: {
    bodyFont: 'var(--nextui-fonts-sans)',
    monoFont: 'var(--nextui-fonts-mono)',
    fontSize: '14px',
    lineHeight: '1.4'
  }
};
