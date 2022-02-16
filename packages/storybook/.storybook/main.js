module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: [
    '../../react/src/**/*.stories.mdx',
    '../../react/src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-a11y']
};
