import {PrismTheme} from "prism-react-renderer";

const codeTheme: PrismTheme = {
  plain: {
    backgroundColor: "hsl(var(--nextui-code-background))",
    color: "#F4F4F4",
    fontWeight: "400",
    fontSize: "14px",
    fontStyle: "normal",
    textRendering: "geometricPrecision",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#71717a",
      },
    },
    {
      types: ["symbol", "text"],
      style: {
        color: "#F4F4F4",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#a2e9c1",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#61AFEF",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 1,
      },
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#E5C07B",
      },
    },
    {
      types: ["property", "function"],
      style: {
        color: "#61AFEF",
      },
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#E06C75",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#f9c97c",
      },
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule",
        "placeholder",
        "variable",
      ],
      style: {
        color: "#98C379",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["language-javascript", "script"],
      style: {
        color: "#a2e9c1",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["important", "primitive", "keyword"],
      style: {
        color: "#c678dd",
      },
    },
  ],
};

export const getCodeThemeColors = () => {
  const stringColor = codeTheme.styles.find((style) => style.types.includes("string"));
  const punctuationColor = codeTheme.styles.find((style) => style.types.includes("punctuation"));
  const numberColor = codeTheme.styles.find((style) => style.types.includes("number"));
  const textColor = codeTheme.styles.find((style) => style.types.includes("text"));
  const selectorColor = codeTheme.styles.find((style) => style.types.includes("selector"));
  const commentColor = codeTheme.styles.find((style) => style.types.includes("comment"));
  const classnameColor = codeTheme.styles.find((style) => style.types.includes("tag"));
  const attrColor = codeTheme.styles.find((style) => style.types.includes("attr-name"));
  const functionColor = codeTheme.styles.find((style) => style.types.includes("function"));
  const primitiveColor = codeTheme.styles.find((style) => style.types.includes("primitive"));

  return {
    ...codeTheme.plain,
    stringColor,
    punctuationColor,
    numberColor,
    textColor,
    selectorColor,
    commentColor,
    classnameColor,
    attrColor,
    functionColor,
    primitiveColor,
  };
};

export default codeTheme;
