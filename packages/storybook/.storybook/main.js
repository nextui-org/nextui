const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: [
    '../../react/src/**/*.stories.mdx',
    '../../react/src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-a11y', 'storybook-dark-mode'],
  typescript: {
    reactDocgen: 'none'
  },
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@nextui-org/react': path.resolve(__dirname, '../../react/src'),
    };
    return config;
  } 
};
