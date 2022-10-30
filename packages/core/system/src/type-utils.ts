export type Globals = "inherit" | "initial" | "revert" | "unset";

export type Index = (number | string) & Record<never, never>;

export type Prefixed<K extends string, T> = `${K}${Extract<T, boolean | number | string>}`;

export type TokenByScaleName<ScaleName, Theme> = ScaleName extends keyof Theme
  ? keyof Theme[ScaleName]
  : never;

export type TokenByPropertyName<PropertyName, Theme, ThemeMap> = PropertyName extends keyof ThemeMap
  ? TokenByScaleName<ThemeMap[PropertyName], Theme>
  : never;
