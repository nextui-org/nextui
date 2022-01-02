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
  type: 'light'
});

export const darkTheme = createTheme({
  ...sharedTheme,
  type: 'dark'
});
