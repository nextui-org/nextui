import React, {useEffect} from "react";

export const DEFAULT_THEME = "light";

export const withTailwindTheme = (Story, context) => {
  const {theme} = context.globals;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const htmlTag = document.documentElement;

    // Set the "data-mode" attribute on the iFrame html tag
    htmlTag.setAttribute("data-mode", theme || DEFAULT_THEME);
  }, [theme]);

  return <Story />;
};
