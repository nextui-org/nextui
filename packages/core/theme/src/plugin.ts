/**
 * Based on the tw-colors by L-Blondy
 * @see https://github.com/L-Blondy/tw-colors
 */

import Color from "color";
import plugin from "tailwindcss/plugin";
import forEach from "lodash.foreach";
import flatten from "flat";
import get from "lodash.get";
import deepMerge from "deepmerge";

import {semanticColors, commonColors} from "./colors";
import {animations} from "./animations";
import {utilities} from "./utilities";
import {removeDefaultKeys} from "./utils/object";
import {baseStyles} from "./utils/styles";

interface MaybeNested<K extends keyof any = string, V = string> {
  [key: string]: V | MaybeNested<K, V>;
}

const SCHEME = Symbol("color-scheme");
const VAR_PREFIX = "nextui";

export type Colors = MaybeNested<string, string>;

export interface ColorsWithScheme<T> extends Colors {
  [SCHEME]?: T;
}

interface FlatColorsWithScheme<T> extends Record<string, string> {
  [SCHEME]?: T;
}

type SchemerFn<T> = (colors: Colors) => ColorsWithScheme<T>;

const dark: SchemerFn<"dark"> = (colors) => {
  return {
    [SCHEME]: "dark",
    ...colors,
  };
};

const light: SchemerFn<"light"> = (colors) => {
  return {
    [SCHEME]: "light",
    ...colors,
  };
};

export type DefaultTheme = "light" | "dark";

export type ConfigObject = Record<string, ColorsWithScheme<"light" | "dark">>;

export type ConfigFunction = ({
  light,
  dark,
}: {
  light: SchemerFn<"light">;
  dark: SchemerFn<"dark">;
}) => ConfigObject;

export type NextUIConfig = {
  /**
   * The theme definitions.
   */
  themes?: ConfigObject | ConfigFunction;
  /**
   * The default theme to use.
   * @default "light"
   */
  defaultTheme?: DefaultTheme;
};

export const resolveConfig = (
  config: ConfigObject | ConfigFunction = {},
  defaultTheme: DefaultTheme,
) => {
  const resolved: {
    variants: {name: string; definition: string[]}[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<
      string,
      ({opacityValue, opacityVariable}: {opacityValue: string; opacityVariable: string}) => string
    >;
  } = {
    variants: [],
    utilities: {},
    colors: {},
  };
  const configObject = typeof config === "function" ? config({dark, light}) : config;

  forEach(configObject, (colors: ColorsWithScheme<"light" | "dark">, themeName: string) => {
    let cssSelector = `.${themeName},.theme-${themeName},[data-theme="${themeName}"]`;

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = colors[SCHEME]
      ? {
          "color-scheme": colors[SCHEME],
        }
      : {};

    // flatten color definitions
    const flatColors = removeDefaultKeys(
      flatten(colors, {
        safe: true,
        delimiter: "-",
      }) as Object,
    ) as FlatColorsWithScheme<"light" | "dark">;

    // resolved.variants
    resolved.variants.push({
      name: `theme-${themeName}`,
      definition: [`&.${themeName}`, `&.theme-${themeName}`, `&[data-theme='${themeName}']`],
    });

    forEach(flatColors, (colorValue, colorName) => {
      // this case was handled above
      if ((colorName as any) === SCHEME || !colorValue) return;

      try {
        // const [h, s, l, defaultAlphaValue] = parseToHsla(colorValue);
        const [h, s, l, defaultAlphaValue] = Color(colorValue).hsl().round().array();
        const nextuiColorVariable = `--${VAR_PREFIX}-${colorName}`;
        const nextuiOpacityVariable = `--${VAR_PREFIX}-${colorName}-opacity`;

        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![nextuiColorVariable] = `${h} ${s}% ${l}%`;
        // if an alpha value was provided in the color definition, store it in a css variable
        if (typeof defaultAlphaValue === "number") {
          resolved.utilities[cssSelector]![nextuiOpacityVariable] = defaultAlphaValue.toFixed(2);
        }
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({opacityVariable, opacityValue}) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!isNaN(+opacityValue)) {
            return `hsl(var(${nextuiColorVariable}) / ${opacityValue})`;
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the nextuiOpacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, var(${opacityVariable})))`;
          }

          return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, 1))`;
        };
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log("error", error?.message);
      }
    });
  });

  return resolved;
};

const corePlugin = (config: ConfigObject | ConfigFunction = {}, defaultTheme: DefaultTheme) => {
  const resolved = resolveConfig(config, defaultTheme);

  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      // add base styles
      addBase({
        [":root, [data-theme]"]: {
          ...baseStyles,
        },
      });
      // add the css variables to "@layer utilities"
      addUtilities({...resolved.utilities, ...utilities});
      // add the theme as variant e.g. "theme-[name]:text-2xl"
      resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
    },
    // extend the colors config
    {
      theme: {
        extend: {
          // @ts-ignore
          colors: {
            ...commonColors,
            ...resolved.colors,
          },
          fontSize: {
            tiny: "0.625rem",
          },
          borderWidth: {
            1: "1px",
            1.5: "1.5px",
            3: "3px",
            5: "5px",
          },
          transitionDuration: {
            0: "0ms",
            250: "250ms",
          },
          ...animations,
        },
      },
    },
  );
};

export const nextui = (config: NextUIConfig = {}) => {
  const userLightColors = get(config.themes, "light", {});
  const userDarkColors = get(config.themes, "dark", {});

  const defaultTheme = config.defaultTheme || "light";

  return corePlugin(
    {
      light: deepMerge(semanticColors.light, userLightColors),
      dark: deepMerge(semanticColors.dark, userDarkColors),
    },
    defaultTheme,
  );
};
