import type * as Stitches from "@stitches/react";

import {TokensGroup, defaultTokens} from "./common";

type TokenKeys = keyof typeof defaultTokens;
type CSSProperties = Stitches.CSSProperties;

/**
 *
 * This function returns the possible key/values for a given token scale. It allows to generate variant values
 * dynamically based on the tokens defined in the theme.
 *
 * @example
 * getVariants("fonts", "fontFamily")
 *
 * // returns
 * {
 *   "sans": {
 *       "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;"
 *   },
 *   "mono": {
 *       "fontFamily": "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace;"
 *   }
 * }
 */
export function getVariants<TK extends TokenKeys>(scale: TK, prop: keyof CSSProperties) {
  if (!defaultTokens[scale]) {
    return;
  }

  return Object.keys(defaultTokens[scale]).reduce((acc, token) => {
    // @ts-ignore
    acc[token] = {
      // @ts-ignore
      [prop]: `${defaultTokens[scale][token]}`,
    };

    return acc;
  }, {}) as unknown as {
    [K in keyof TokensGroup[TK]]: {[P in keyof CSSProperties]: TokensGroup[TK][K]};
  };
}
