import { SandpackTheme } from '@codesandbox/sandpack-react';

export const nextuiTheme: SandpackTheme = {
  palette: {
    activeText: '#F4F4F4',
    defaultText: 'var(--nextui-colors-codeComment)',
    inactiveText: '#e4e7eb',
    activeBackground: '#A258DF2b',
    defaultBackground: 'var(--nextui-colors-codeBackground)',
    inputBackground: '#ffffff',
    accent: '#A258DF',
    errorBackground: '#ffcdca',
    errorForeground: '#811e18'
  },
  syntax: {
    plain: '#F4F4F4',
    comment: {
      color: 'var(--nextui-colors-codeComment)',
      fontStyle: 'italic'
    },
    keyword: '#c678dd',
    tag: '#E5C07B',
    punctuation: '#F4F4F4',
    definition: '#F4F4F4',
    property: '#F4F4F4',
    static: 'var(--nextui-colors-yellow600)',
    string: '#98C379'
  },
  typography: {
    bodyFont: 'var(--nextui-fonts-sans)',
    monoFont: 'var(--nextui-fonts-mono)',
    fontSize: '14px',
    lineHeight: '1.4'
  }
};
