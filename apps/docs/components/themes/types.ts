// Colors
export interface ColorShades {
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
}

export type ColorPickerType =
  | "background"
  | "content1"
  | "content2"
  | "content3"
  | "content4"
  | "danger"
  | "default"
  | "divider"
  | "focus"
  | "foreground"
  | "overlay"
  | "primary"
  | "secondary"
  | "success"
  | "warning";

// NextUI component props
export type NextUIColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
export type NextUISize = "sm" | "md" | "lg";
export type NextUIVariant =
  | "dot"
  | "solid"
  | "faded"
  | "bordered"
  | "light"
  | "flat"
  | "ghost"
  | "shadow"
  | "underlined";
export type NextUIRadius = "none" | "sm" | "md" | "lg" | "full";

// Themes
export type ThemeType = "light" | "dark";

export interface ThemeColor extends ColorShades {
  foreground: string;
  DEFAULT: string;
}

// Configuration
export interface Config {
  light: ConfigColors;
  dark: ConfigColors;
  layout: ConfigLayout;
}

export interface ConfigColors {
  brandColor: {
    default: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
  };
  baseColor: {
    foreground: string;
    background: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
  };
  otherColor: {
    focus: string;
    overlay: string;
    divider: string;
  };
}

export interface ConfigLayout {
  fontSize: {
    tiny: string;
    small: string;
    medium: string;
    large: string;
  };
  lineHeight: {
    tiny: string;
    small: string;
    medium: string;
    large: string;
  };
  radius: {
    small: string;
    medium: string;
    large: string;
  };
  borderWidth: {
    small: string;
    medium: string;
    large: string;
  };
  otherParams: {
    disabledOpacity: string;
    dividerWeight: string;
    hoverOpacity: string;
  };
}

// Templates
export interface Template {
  label: string;
  name: TemplateType;
  value: Config;
}

export type TemplateType = "coffee" | "emerald" | "nextui";
