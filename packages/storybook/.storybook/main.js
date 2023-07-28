module.exports = {
  stories: [
    "./welcome.stories.mdx",
    // default page
    "../../components/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../core/theme/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: {
          implementation: require.resolve("lightningcss"),
        },
      },
    },
  ],
  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
};
