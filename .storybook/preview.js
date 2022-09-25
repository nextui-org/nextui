import React from 'react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import { createTheme, NextUIProvider, styled } from '@nextui-org/react';

const lightTheme = createTheme({
  type: 'light',
  className: 'light-theme'
});

const darkTheme = createTheme({
  type: 'dark',
  className: 'dark-theme'
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
  height: '100vh'
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
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    stylePreview: true,
    darkClass: 'dark-theme',
    lightClass: 'light-theme',
    dark: {
      ...themes.dark,
      // accent0, accent1
      appBg: '#161616',
      barBg: '#262626',
      background: '#161616',
      appContentBg: '#161616',
      // radii xs
      appBorderRadius: 7
    },
    light: {
      ...themes.normal,
      // accent0, accent1
      appBg: '#F5F5F5',
      barBg: '#EDEDED',
      background: '#F5F5F5',
      appContentBg: '#F5F5F5',
      // radii xs
      appBorderRadius: 7
    }
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
