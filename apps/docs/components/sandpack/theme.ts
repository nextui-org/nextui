import {SandpackTheme} from "@codesandbox/sandpack-react";

export const nextuiTheme: SandpackTheme = {
  colors: {
    surface1: "hsl(var(--nextui-code-background))",
    surface2: "hsl(var(--nextui-code-background))",
    surface3: "hsl(0, 0%, 15%)",
    disabled: "#A258DF2b",
    base: "hsl(var(--nextui-code-background))",
    clickable: "#ffffff",
    hover: "#A258DF",
    accent: "#A258DF",
    error: "#811e18",
    errorSurface: "#ffcdca",
  },
  syntax: {
    plain: "rgb(var(--code-foreground))",
    comment: {
      color: "rgb(var(--code-comment))",
      fontStyle: "italic",
      fontWeight: "300",
    },
    keyword: "rgb(var(--code-keyword))",
    definition: "rgb(var(--code-number))",
    punctuation: "rgb(var(--code-punctuation))",
    property: "rgb(var(--code-attr-name))",
    tag: "rgb(var(--code-tag))",
    static: "rgb(var(--code-number))",
    string: "rgb(var(--code-string))",
  },
  font: {
    body: "Inter var",
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: "14px",
    lineHeight: "1.5rem",
  },
};
