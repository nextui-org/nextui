module.exports = {
  stories: [
    '../../react/src/**/*.stories.mdx',
    '../../react/src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-a11y'],
  babel: async (options) => ({
    ...options,
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods'
    ]
  }),
  typescript: {
    reactDocgen: 'none'
  }
};
