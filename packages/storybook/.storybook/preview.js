import React from 'react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import { createTheme, NextUIProvider, styled } from '@nextui-org/react';

const lightTheme = createTheme({
  type: 'light',
  className: 'light-mode'
});

const darkTheme = createTheme({
  type: 'dark',
  className: 'dark-mode'
});

const Box = styled('div', {
  display: 'flex',
  bg: '$background',
  color: '$text',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100vw',
  height: 'calc(100vh - 60px)'
});

export const decorators = [
  (Story) => (
    <NextUIProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      <Box>
        <Story />
      </Box>
    </NextUIProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    stylePreview: true,
    dark: { ...themes.dark, appBg: 'black' },
    light: { ...themes.normal, appBg: 'white' }
  },
  backgrounds: {
    default: 'light'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
