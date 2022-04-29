import { createTheme } from '@nextui-org/react';

const fonts = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace'
};

export const lightTheme = createTheme({
  type: 'light',
  className: 'nextui-docs-light',
  theme: {
    fonts,
    colors: {
      headerBackground: 'hsla(0,0%,100%,0.8)',
      menuBackground: 'rgba(255, 255, 255, 0.5)',
      headerIconColor: '$accents4',
      codeBackground: '#363449',
      codeComment: '$accents6',
      codeCopyIconColor: '$accents2',
      cardBackground: '$background',
      codeHighlight: 'hsl(243, 16%, 30%)',
      backgroundBlur: 'rgba(255, 255, 255, 0.5)',
      blockLinkColor: '#FF1CF7',
      blockLinkBackground: '$accents1',
      blockLinkHoverBackground: '#FFD1ED'
    }
  }
});

export const darkTheme = createTheme({
  type: 'dark',
  className: 'nextui-docs-dark',
  theme: {
    fonts,
    colors: {
      menuBackground: 'rgba(0,0,0,0.8)',
      headerBackground: 'rgba(0,0,0,0.5)',
      headerIconColor: '$accents8',
      codeBackground: '#111111',
      codeComment: '$accents8',
      codeCopyIconColor: '$accents5',
      codeHighlight: 'hsl(0, 0%, 15%)',
      cardBackground: '$accents1',
      backgroundBlur: 'rgba(255, 255, 255, 0.1)',
      blockLinkColor: '#FFA4E3',
      blockLinkBackground: '$accents1',
      blockLinkHoverBackground: '#55057A'
    }
  }
});
