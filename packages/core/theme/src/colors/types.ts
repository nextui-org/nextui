export type ColorScale = Partial<{
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  contrastText: string;
  DEFAULT: string;
}>;

export type BaseColors = {
  background: ColorScale;
  foreground: ColorScale;
  border: ColorScale;
};

export type SemanticColors = BaseColors & {
  neutral: ColorScale;
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  danger: ColorScale;
};

export type SemanticBaseColors = {
  light: BaseColors;
  dark: BaseColors;
};
