import React from 'react';
import { CssBaseline } from '@nextui-org/react';

export const decorators = [
  (Story) => (
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
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#FFFFFF'
      },
      {
        name: 'dark',
        value: '#000000'
      }
    ]
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
