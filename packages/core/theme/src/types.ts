import {ThemeColors} from "./colors/types";

export type DefaultThemeType = "light" | "dark";

export type BaseThemeUnit = {
  small?: string;
  medium?: string;
  large?: string;
};

export type FontThemeUnit = BaseThemeUnit & {
  tiny?: string;
};

export const spacingScaleKeys = [
  "0",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
  "1",
  "2",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96",
];

export const mappedSpacingScaleKeys = spacingScaleKeys.map((key) => `unit-${key}`);

export type SpacingScaleKeys = (typeof spacingScaleKeys)[number];

export type SpacingScale = Partial<Record<SpacingScaleKeys, string>>;

export interface LayoutTheme {
  /**
   * Base unit token that defines a consistent spacing scale across the components.
   *
   * @default 4 (px)
   */
  spacingUnit?: number;
  /**
   * The default font size applied across the components.
   *
   * @default
   * {
   *    tiny: "0.75rem",
   *    small: "0.875rem",
   *    medium: "1rem",
   *    large: "1.125rem",
   *    DEFAULT: "1rem",
   * }
   */
  fontSize?: FontThemeUnit;
  /**
   * The default line height applied across the components.
   *
   * @default
   * {
   *    tiny: "1rem",
   *    small: "1.25rem",
   *    medium: "1.5rem",
   *    large: "1.75rem",
   *    DEFAULT: "1.5rem",
   * }
   */
  lineHeight?: FontThemeUnit;
  /**
   * The default radius applied across the components.
   * we recommend to use `rem` units.
   *
   * @default
   * {
   *   small: "0.25rem",
   *   medium: "0.5rem",
   *   large: "0.75rem",
   * }
   */
  radius?: BaseThemeUnit;
  /**
   * A number between 0 and 1 that is applied as opacity-[value] when the component is disabled.
   *
   * format: ".[value]"
   *
   * @default .5
   */
  disabledOpacity?: string | number;
  /**
   * A number between 0 and 1 that is applied as opacity-[value] when the component is hovered.
   *
   * format: ".[value]"
   *
   * @default .8
   */
  hoverOpacity?: string | number;
  /**
   * The default height applied to the divider component.
   * we recommend to use `px` units.
   *
   * @default 1px
   */
  dividerWeight?: string;
  /**
   * The border width applied across the components.
   * @default
   * {
   *    small: "1px",
   *    medium: "2px",
   *    large: "3px",
   * }
   *
   */
  borderWidth?: BaseThemeUnit;
  /**
   * The box shadow applied across the components.
   *
   * @default
   * {
   *   small: 0px 0px 5px 0px rgb(0 0 0 / 0.01), 0px 2px 10px 0px rgb(0 0 0 / 0.06),
   *   medium: 0px 0px 15px 0px rgb(0 0 0 / 0.02), 0px 2px 30px 0px rgb(0 0 0 / 0.08),
   *   large: 0px 0px 30px 0px rgb(0 0 0 / 0.03), 0px 30px 60px 0px rgb(0 0 0 / 0.12),
   * }
   */
  boxShadow?: BaseThemeUnit;
}

export type ConfigTheme = {
  extend?: "light" | "dark";
  layout?: LayoutTheme;
  colors?: Partial<ThemeColors>;
};

export type ConfigThemes = Record<string, ConfigTheme>;

/**
 * The NextUI config.
 * @see https://nextui.org/docs/customization/customize-theme
 */
export type NextUIPluginConfig = {
  /**
   * The prefix for the css variables.
   * @default "nextui"
   */
  prefix?: string;
  /**
   * If true, the common nextui colors (e.g. "blue", "green", "purple") will not be extended on the theme.
   * @default false
   */
  addCommonColors?: boolean;
  /**
   * Common layout definitions. These definitions are applied to all themes.
   */
  layout?: LayoutTheme;
  /**
   * The theme definitions.
   */
  themes?: ConfigThemes;
  /**
   * The default theme to use.
   * @default "light"
   */
  defaultTheme?: DefaultThemeType;
  /**
   * The default theme to extend.
   * @default "light"
   */
  defaultExtendTheme?: DefaultThemeType;
};
