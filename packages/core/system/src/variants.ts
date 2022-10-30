import type * as Stitches from "@stitches/react";

import {CssComponent} from "@stitches/react/types/styled-component";

import {ThemeMap, Media, defaultTokens, defaultThemeMap} from "./common";
import {theme} from "./stitches.config";
import {Prefixed} from "./type-utils";

type Theme = typeof theme;
type TokenKeys = keyof typeof defaultTokens;
type CSSProperties = Stitches.CSSProperties;
type VariantsToGenerate = {
  [K in string]: keyof ThemeMap;
};

/**
 *
 * This function returns the possible key/values for a given token scale. It allows to generate variant values
 * dynamically based on the tokens defined in the theme.
 *
 * @param tokensGroup The tokens group to use
 * @param tokenKey The token key to use
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
function getVariants<TK extends TokenKeys>(scale: TK, prop: keyof CSSProperties) {
  if (!theme[scale]) {
    return;
  }

  return Object.keys(theme[scale]).reduce((acc, token) => {
    // @ts-ignore
    acc[token] = {
      // @ts-ignore
      [prop]: `${theme[scale][token]}`,
    };

    return acc;
  }, {});
}

/**
 * This function generates variants based on the key & tokens defined in the theme.
 *
 * @param variants The variants to generate
 *
 * @example
 * generateVariants({
 *  bgColor: "backgroundColor",
 *  color: "colors",
 * })
 *
 * // returns
 *
 * variants: {
 *  "bgColor": {
 *    "primary": {
 *      backgroundColor: "$blue600"
 *    },
 *    "secondary": {
 *      backgroundColor: "$purple600"
 *    },
 *    "success": {},
 *    .... all the colors defined in the theme
 *  },
 *  "color": {
 *    "primary": {},
 *    "secondary": {},
 *    "success": {},
 *    .... all the colors defined in the theme
 *   },
 *   ... all the variants to generate
 * }
 */
export function generateVariants<VG extends VariantsToGenerate>(vg: VG) {
  const variants = Object.keys(vg).reduce((acc, themeMapKey) => {
    const key = vg[themeMapKey];

    if (!defaultThemeMap[key as keyof ThemeMap]) {
      return acc;
    }

    const mapKey = defaultThemeMap[key];

    // @ts-ignore
    acc[themeMapKey] = getVariants(mapKey, key);

    return acc;
  }, {});

  return {variants} as unknown as {
    variants: {
      [K in keyof VG]: {
        [Q in keyof Theme[ThemeMap[VG[K]]]]: {
          [P in VG[K]]: Prefixed<"$", Q>;
        };
      };
    };
  };
}

type ComponentVariants = {
  variants: {
    [Name in string]: {
      [Variant in string]: {};
    };
  };
};

type TranformToVariants<V extends ComponentVariants> = {
  variants: {
    [K in keyof V["variants"]]?: keyof V["variants"][K];
  };
};

export type GeneratedVariantsProps<V extends ComponentVariants> = V extends ComponentVariants
  ? Stitches.VariantProps<CssComponent<never, TranformToVariants<V>["variants"], Media>>
  : never;
