import { createTheme, Theme } from '@nextui-org/react';

const fonts = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace'
};

const sharedTheme: Theme = {
  theme: {
    fonts
  }
};

export const lightTheme = createTheme({
  ...sharedTheme,
  type: 'light',
  theme: {
    colors: {
      headerBackground: 'hsla(0,0%,100%,0.8)',
      headerIconColor: '$accents4',
      codeBackground: '#363449',
      codeComment: '$accents3',
      codeCopyIconColor: '$accents2',
      cardBackground: '$background',
      backgroundBlur: 'rgba(255, 255, 255, 0.5)',
      blockLinkColor: '#FF1CF7',
      blockLinkBackground: '$accents1',
      blockLinkHoverBackground: '#FFD1ED'
    }
  }
});

export const darkTheme = createTheme({
  ...sharedTheme,
  type: 'dark',
  theme: {
    colors: {
      headerBackground: 'rgba(0,0,0,0.5)',
      headerIconColor: '$accents6',
      codeBackground: '#111111',
      codeComment: '$accents6',
      codeCopyIconColor: '$accents5',
      cardBackground: '$accents1',
      backgroundBlur: 'rgba(255, 255, 255, 0.1)',
      blockLinkColor: '#FFA4E3',
      blockLinkBackground: '$accents1',
      blockLinkHoverBackground: '#55057A',
      selection: '$purple700'
    }
  }
});
