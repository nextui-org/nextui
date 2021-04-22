import React from 'react';
import CssBaseline from '@components/css-baseline';
import { addDecorator } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';

addDecorator(withPropsTable);

export const decorators = [
  (Story) => (
    <>
      <CssBaseline />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#FFFFFF',
      },
      {
        name: 'dark',
        value: '#000000',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
