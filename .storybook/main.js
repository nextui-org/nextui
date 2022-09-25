const path = require("path");
const fs = require("fs");

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories(pkg) {
  const scope = pkg ? [pkg] : fs.readdirSync("packages/components");
  return scope
    .map((package) => `packages/components/${package}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`);
}

module.exports = {
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
  ],
  stories: getStories(),
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@nextui-org/react": path.resolve(
        __dirname,
        "../packages/components/react/src",
      ),
    }
    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
  typescript: {
    reactDocgen: false,
  },
};
