module.exports = {
  stories: [
    "../../link/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../avatar/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../user/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../button/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../spinner/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../code/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../tooltip/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../snippet/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.(js|jsx|ts|tsx)$/],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};
