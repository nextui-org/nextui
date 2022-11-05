import React from "react";
import {themes} from "@storybook/theming";
import {useDarkMode} from "storybook-dark-mode";
import {DocsContainer} from "@storybook/addon-docs";
import {createTheme, NextUIProvider, styled} from "@nextui-org/react";

const lightTheme = createTheme({
  type: "light",
  className: "light-theme",
});

const darkTheme = createTheme({
  type: "dark",
  className: "dark-theme",
});

const Box = styled("div", {
  size: "100%",
  color: "$text",
  bg: "$background",
  variants: {
    mode: {
      docs: {
        ".sbdocs": {
          bg: "$accents0",
        },
        ".sbdocs-title, .sbdocs-h2, .sbdocs-h3": {
          color: "$text",
        },
        ".docblock-emptyblock": {
          border: "none",
          color: "$text",
          bg: "$accents1",
          borderRadius: "$xs",
        },
        ".os-host-foreign": {
          bg: "$accents1",
        },
        ".sbdocs-preview": {
          boxShadow: "$sm",
          borderRadius: "$xs",
        },
        "div.docs-story": {
          bg: "none !important",
          "div:has(button.docblock-code-toggle)": {
            us: "none",
            bg: "$accents1",
            overflow: "hidden",
            borderTopLeftRadius: "$xs",
          },
        },
      },
      canvas: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "$md $lg",
      },
    },
  },
  defaultVariants: {
    mode: "canvas",
  },
});

const DocsContainerTheme = (props) => {
  return (
    <NextUIProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      <Box mode="docs">
        <DocsContainer {...props} />
      </Box>
    </NextUIProvider>
  );
};

export const decorators = [
  (Story) => (
    <NextUIProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      <Box>
        <Story />
      </Box>
    </NextUIProvider>
  ),
];

export const parameters = {
  layout: "fullscreen",
  actions: {argTypesRegex: "^on[A-Z].*"},
  darkMode: {
    stylePreview: true,
    darkClass: darkTheme.className,
    lightClass: lightTheme.className,
    light: {
      ...themes.normal,
      appBg: "#F1F3F5",
      barBg: "#ECEEF0",
      background: "#F1F3F5",
      appContentBg: "#F1F3F5",
      appBorderRadius: 7,
    },
    dark: {
      ...themes.dark,
      appBg: "#16181A",
      barBg: "#26292B",
      background: "#16181A",
      appContentBg: "#16181A",
      appBorderRadius: 7,
    },
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    container: (props) => <DocsContainerTheme {...props} />,
  },
};
