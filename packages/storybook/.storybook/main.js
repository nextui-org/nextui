import { dirname, join } from "path";

// Helper function to get absolute path for a package
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

module.exports = {
  stories: [
    //"./welcome.stories.mdx",
    "../../components/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../core/theme/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("storybook-dark-mode"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      reactStrictMode: true, // Enable React Strict Mode here
    },
  },
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@emotion/react": getAbsolutePath("@emotion/react"),
      "@emotion/styled": getAbsolutePath("@emotion/styled"),
    };
    return config;
  },
};
