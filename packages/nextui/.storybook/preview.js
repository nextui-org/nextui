import React from 'react';
import CssBaseline from '@components/css-baseline';
import { addDecorator } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import _JSXStyle from 'styled-jsx/style';

if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle });
}

addDecorator(withPropsTable);

export const decorators = [
  (Story) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
      }}
    >
      <CssBaseline />
      <Story />
    </div>
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
