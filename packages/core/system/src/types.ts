import type * as Stitches from "@stitches/react";
import type {Globals, Index, TokenByPropertyName} from "./type-utils";

import {createThemeBase, config, theme, css} from "./stitches.config";
import commonTheme from "./common";

/** Configuration Interface */
export declare namespace ConfigType {
  /** Media interface. */
  export type Media<T = {}> = {
    [name in keyof T]: T[name] extends string ? T[name] : string;
  };

  /** Theme interface. */
  export type Theme<T = {}> = {
    fonts?: {[token in number | string]: boolean | number | string};
    fontSizes?: {[token in number | string]: boolean | number | string};
    fontWeights?: {[token in number | string]: boolean | number | string};
    lineHeights?: {[token in number | string]: boolean | number | string};
    letterSpacings?: {[token in number | string]: boolean | number | string};
    space?: {[token in number | string]: boolean | number | string};
    radii?: {[token in number | string]: boolean | number | string};
    zIndices?: {[token in number | string]: boolean | number | string};
    borderWidths?: {[token in number | string]: boolean | number | string};
    colors?: {[token in number | string]: boolean | number | string};
    shadows?: {[token in number | string]: boolean | number | string};
    dropShadows?: {[token in number | string]: boolean | number | string};
    transitions?: {[token in number | string]: boolean | number | string};
  } & {
    [Scale in keyof T]: {
      [Token in keyof T[Scale]]: T[Scale][Token] extends boolean | number | string
        ? T[Scale][Token]
        : boolean | number | string;
    };
  };
  /** ThemeMap interface. */
  export type ThemeMap<T = {}> = {
    [Property in keyof T]: T[Property] extends string ? T[Property] : string;
  };

  /** Utility interface. */
  export type Utils<T = {}> = {
    [Property in keyof T]: T[Property] extends (value: infer V) => {}
      ?
          | T[Property]
          | ((value: V) => {
              [K in keyof Stitches.CSSProperties]?: Stitches.CSSProperties[K] | V;
            })
      : never;
  };
}

// stitches types
export type StitchesConfig = typeof config;
export type VariantProps<T> = Stitches.VariantProps<T>;
export type PropertyValue<T extends keyof Stitches.CSSProperties> = Stitches.PropertyValue<T>;
export type ScaleValue<T> = Stitches.ScaleValue<T>;
export type CSSProperties = Stitches.CSSProperties;
export type CSS = Stitches.CSS<StitchesConfig>;
export type StitchesTheme = typeof theme;
export type CSSComponent = typeof css;

// theme types
export type BaseThemeMap = StitchesConfig["themeMap"];
export type BaseTheme = ConfigType.Theme;
export type NextUITheme = StitchesTheme;
export type ThemeType = "dark" | "light";
export type CreateTheme = ReturnType<typeof createThemeBase>;

export type Theme = {
  /**
   * The theme type.
   * @default "light"
   */
  type?: ThemeType | string;
  /**
   * The stitches theme class name.
   * @see https://stitches.dev/docs/theming#add-a-new-theme
   */
  className?: string;
  /**
   * The stitches theme tokens object.
   */
  theme?: BaseTheme;
  /**
   * The stitches theme media object.
   * @see https://stitches.dev/docs/breakpoints
   */
  media?: ConfigType.Media;
  /**
   * The theme utils object.
   * @see https://stitches.dev/docs/utils
   */
  utils?: ConfigType.Utils;
  /**
   * The stitches theme themeMap object.
   * @see https://stitches.dev/docs/tokens#property-mapping
   */
  themeMap?: ConfigType.ThemeMap;
};

export type NextUIThemeContext = {
  type: ThemeType | string;
  theme?: NextUITheme;
  isDark?: boolean;
};

// tokens types
export type TokenKeyName = keyof typeof commonTheme["theme"];

export interface TokenValue {
  token: number | string;
  value: number | string;
  scale: string;
  prefix: string;
}

// styles types

export type CSSProp = {
  [K in keyof CSSProperties]?:
    | TokenByPropertyName<K, NextUITheme, BaseThemeMap>
    | Globals
    | Index
    | undefined;
};
