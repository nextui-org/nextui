module.exports = {
  stories: ["../../link/stories/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    docsPage: true,
  },
  typescript: {
    reactDocgen: "none",
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [...options.presets,[ "@babel/preset-react", {
          runtime: 'automatic',
      }], "@babel/preset-typescript"],
    };
  },
  staticDirs: ["../public"],
};
