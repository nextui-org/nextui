import React from "react";
import {themes} from "@storybook/theming";
import {NextUIProvider} from "@nextui-org/react";
import Style from "./style";

export const decorators = [
  (Story) => (
    <NextUIProvider>
      <div className="bg-dark">
        <Style />
        <Story />
      </div>
    </NextUIProvider>
  ),
];

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
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
      appBorderRadius: 14,
    },
  },
};
