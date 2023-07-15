/**
 * Based on tw-colors by L-Blondy
 * @see https://github.com/L-Blondy/tw-colors
 */

import Color from "color";
import plugin from "tailwindcss/plugin.js";
import get from "lodash.get";
import omit from "lodash.omit";
import forEach from "lodash.foreach";
import mapKeys from "lodash.mapkeys";
import kebabCase from "lodash.kebabcase";
import deepMerge from "deepmerge";

import {semanticColors, commonColors} from "./colors";
import {animations} from "./animations";
import {utilities} from "./utilities";
import {flattenThemeObject} from "./utils/object";
import {createSpacingUnits, generateSpacingScale, isBaseTheme} from "./utils/theme";
import {baseStyles} from "./utils/classes";
import {ConfigTheme, ConfigThemes, DefaultThemeType, NextUIPluginConfig} from "./types";
import {lightLayout, darkLayout, layouts, defaultLayout} from "./default-layout";

const DEFAULT_PREFIX = "nextui";

// @internal
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
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

  forEach(themes, ({extend, layout, colors}: ConfigTheme, themeName: string) => {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;
    const scheme = themeName === "light" || themeName === "dark" ? themeName : extend;

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          "color-scheme": scheme,
        }
      : {};

    // flatten color definitions
    const flatColors = flattenThemeObject(colors);

    const flatLayout = layout ? mapKeys(layout, (value, key) => kebabCase(key)) : {};

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    /**
     * Colors
     */
    forEach(flatColors, (colorValue, colorName) => {
      if (!colorValue) return;

      try {
        // const [h, s, l, defaultAlphaValue] = parseToHsla(colorValue);
        const [h, s, l, defaultAlphaValue] = Color(colorValue).hsl().round().array();
        const nextuiColorVariable = `--${prefix}-${colorName}`;
        const nextuiOpacityVariable = `--${prefix}-${colorName}-opacity`;

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

    /**
     * Layout
     */
    forEach(flatLayout, (value, key) => {
      if (!value) return;

      if (typeof value === "object") {
        forEach(value, (v, k) => {
          const layoutVariable = `--${prefix}-${key}-${k}`;

          resolved.utilities[cssSelector]![layoutVariable] = v;
        });
      } else if (key === "spacing-unit") {
        const layoutVariable = `--${prefix}-${key}`;

        // add the base unit "--spacing-unit: value"
        resolved.utilities[cssSelector]![layoutVariable] = value;

        const spacingScale = generateSpacingScale(Number(value));

        // add the list of spacing units "--spacing-unit-[key]: value"
        forEach(spacingScale, (v, k) => {
          const layoutVariable = `--${prefix}-${key}-${k}`;

          resolved.utilities[cssSelector]![layoutVariable] = v;
        });
      } else {
        const layoutVariable = `--${prefix}-${key}`;

        resolved.utilities[cssSelector]![layoutVariable] = value;
      }
    });
  });

  return resolved;
};

const corePlugin = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
  omitCommonColors: boolean,
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix);
  const minSizes = {
    "unit-1": `var(--${prefix}-spacing-unit)`,
    "unit-2": `var(--${prefix}-spacing-unit-2`,
    "unit-3": `var(--${prefix}-spacing-unit-3)`,
    "unit-3.5": `var(--${prefix}-spacing-unit-3_5)`,
    "unit-4": `var(--${prefix}-spacing-unit-4)`,
    "unit-5": `var(--${prefix}-spacing-unit-5)`,
    "unit-6": `var(--${prefix}-spacing-unit-6)`,
    "unit-7": `var(--${prefix}-spacing-unit-7)`,
    "unit-8": `var(--${prefix}-spacing-unit-8)`,
    "unit-9": `var(--${prefix}-spacing-unit-9)`,
    "unit-10": `var(--${prefix}-spacing-unit-10)`,
    "unit-11": `var(--${prefix}-spacing-unit-11)`,
    "unit-12": `var(--${prefix}-spacing-unit-12)`,
    "unit-16": `var(--${prefix}-spacing-unit-16)`,
    "unit-20": `var(--${prefix}-spacing-unit-20)`,
    "unit-24": `var(--${prefix}-spacing-unit-24)`,
  };

  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      // add base classNames
      addBase({
        [":root, [data-theme]"]: {
          ...baseStyles(prefix),
        },
      });
      // add the css variables to "@layer utilities"
      addUtilities({...resolved.utilities, ...utilities});
      // add the theme as variant e.g. "[theme-name]:text-2xl"
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
            ...(omitCommonColors ? {} : commonColors),
            ...resolved.colors,
          },
          height: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          width: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          spacing: {
            unit: `var(--${prefix}-spacing-unit)`,
            ...createSpacingUnits(prefix),
          },
          minWidth: {
            ...minSizes,
          },
          minHeight: {
            ...minSizes,
          },
          fontSize: {
            tiny: [`var(--${prefix}-font-size-tiny)`, `var(--${prefix}-line-height-tiny)`],
            small: [`var(--${prefix}-font-size-small)`, `var(--${prefix}-line-height-small)`],
            medium: [`var(--${prefix}-font-size-medium)`, `var(--${prefix}-line-height-medium)`],
            large: [`var(--${prefix}-font-size-large)`, `var(--${prefix}-line-height-large)`],
          },
          borderRadius: {
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`,
          },
          opacity: {
            disabled: `var(--${prefix}-disabled-opacity)`,
          },
          borderWidth: {
            small: `var(--${prefix}-border-width-small)`,
            medium: `var(--${prefix}-border-width-medium)`,
            large: `var(--${prefix}-border-width-large)`,
            1: "1px",
            1.5: "1.5px",
            3: "3px",
            5: "5px",
          },
          boxShadow: {
            small: `var(--${prefix}-box-shadow-small)`,
            medium: `var(--${prefix}-box-shadow-medium)`,
            large: `var(--${prefix}-box-shadow-large)`,
          },
          backgroundImage: {
            "stripe-gradient":
              "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%, transparent)",
          },
          transitionDuration: {
            0: "0ms",
            250: "250ms",
            400: "400ms",
          },
          transitionTimingFunction: {
            "soft-spring": "cubic-bezier(0.155, 1.105, 0.295, 1.12)",
          },
          ...animations,
        },
      },
    },
  );
};

export const nextui = (config: NextUIPluginConfig = {}) => {
  const themeObject = config.themes;

  const userLightColors = get(themeObject, "light.colors", {});
  const userDarkColors = get(themeObject, "dark.colors", {});

  const defaultTheme = config.defaultTheme || "light";
  const defaultExtendTheme = config.defaultExtendTheme || "light";
  const defaultPrefix = config.prefix || DEFAULT_PREFIX;
  const omitCommonColors = config.omitCommonColors || false;

  // get other themes from the config different from light and dark
  let otherThemes = omit(themeObject, ["light", "dark"]) || {};

  forEach(otherThemes, ({extend, colors, layout}, themeName) => {
    const baseTheme = extend && isBaseTheme(extend) ? extend : defaultExtendTheme;

    if (colors && typeof colors === "object") {
      otherThemes[themeName].colors = deepMerge(semanticColors[baseTheme], colors);
    }
    if (layout && typeof layout === "object") {
      otherThemes[themeName].layout = deepMerge(extend ? layouts[extend] : defaultLayout, layout);
    }
  });

  const light: ConfigTheme = {
    layout: deepMerge(lightLayout, get(themeObject, "light.layout", {})),
    colors: deepMerge(semanticColors.light, userLightColors),
  };

  const dark = {
    layout: deepMerge(darkLayout, get(themeObject, "dark.layout", {})),
    colors: deepMerge(semanticColors.dark, userDarkColors),
  };

  const themes = {
    light,
    dark,
    ...otherThemes,
  };

  return corePlugin(themes, defaultTheme, defaultPrefix, omitCommonColors);
};
