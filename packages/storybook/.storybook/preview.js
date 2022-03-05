import React from 'react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import { createTheme, NextUIProvider } from '@nextui-org/react';

const lightTheme = createTheme({
  type: 'light'
});

const darkTheme = createTheme({
  type: 'dark'
});
export const decorators = [
  (Story) => (
    <NextUIProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100vw',
          height: 'calc(100vh - 60px)'
        }}
      >
        <CssBaseline />
        <Story />
      </div>
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
