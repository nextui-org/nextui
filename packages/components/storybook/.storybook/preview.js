import {themes} from "@storybook/theming";
import Style from "./style";

export const decorators = [
  (Story) => (
    <div className="bg-dark">
      <Style />
      <Story />
    </div>
  ),
];

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    darkClass: "dark",
    stylePreview: true,
    dark: {
      ...themes.dark,
      appBg: "#161616",
      barBg: "black",
      background: "black",
      appContentBg: "black",
      appBorderRadius: 14,
    },
    light: {
      ...themes.light,
      appBorderRadius: 14
    }
  },
};
