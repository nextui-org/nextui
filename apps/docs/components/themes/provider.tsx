import {useState, createContext, useMemo, useCallback} from "react";
import {useLocalStorage} from "usehooks-ts";

import {configKey, initialConfig} from "./constants";
import {ConfigColors, Config, ConfigLayout, ThemeType} from "./types";

export interface ThemeBuilderProviderI {
  config: Config;
  resetConfig: (theme: ThemeType, sync: boolean) => Config;
  setBaseColor: (newConfig: Partial<ConfigColors["baseColor"]>, theme: ThemeType) => void;
  setBorderWidth: (newConfig: Partial<ConfigLayout["borderWidth"]>) => void;
  setBrandColor: (
    newConfig: Partial<ConfigColors["brandColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => void;
  setConfiguration: (newConfig: Config, theme: ThemeType, sync: boolean) => void;
  setLineHeight: (newConfig: Partial<ConfigLayout["lineHeight"]>) => void;
  setFontSize: (newConfig: Partial<ConfigLayout["fontSize"]>) => void;
  setOtherColor: (
    newConfig: Partial<ConfigColors["otherColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => void;
  setOtherParams: (newConfig: Partial<ConfigLayout["otherParams"]>) => void;
  setRadius: (newConfig: Partial<ConfigLayout["radius"]>) => void;
}

export const ThemeBuilderContext = createContext<ThemeBuilderProviderI>({
  config: initialConfig,
  resetConfig: () => initialConfig,
  setBaseColor: () => {},
  setBorderWidth: () => {},
  setBrandColor: () => {},
  setConfiguration: () => {},
  setLineHeight: () => {},
  setFontSize: () => {},
  setOtherColor: () => {},
  setOtherParams: () => {},
  setRadius: () => {},
});

interface ThemeBuilderProviderProps {
  children: React.ReactNode;
}

export default function ThemeBuilderProvider({children}: ThemeBuilderProviderProps) {
  // ASK: There are 3 local storage imports. Which one should I use?
  const [lsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [config, setConfig] = useState<Config>(lsConfig);

  const setConfiguration = useCallback((newConfig: Config, theme: ThemeType, sync: boolean) => {
    setConfig((prev) =>
      sync
        ? newConfig
        : {
            ...prev,
            [theme]: newConfig[theme],
          },
    );
  }, []);

  const resetConfig = useCallback((theme: ThemeType, sync: boolean) => {
    let newConfig = initialConfig;

    setConfig((prev) => {
      newConfig = sync
        ? newConfig
        : {
            ...prev,
            [theme]: newConfig[theme],
            layout: newConfig.layout,
          };

      return newConfig;
    });

    return newConfig;
  }, []);

  const setBrandColor = useCallback(
    (newConfig: Partial<ConfigColors["brandColor"]>, theme: ThemeType, sync: boolean) => {
      setConfig((prev) =>
        sync
          ? {
              ...prev,
              light: {
                ...prev.light,
                brandColor: {
                  ...prev.light.brandColor,
                  ...newConfig,
                },
              },
              dark: {
                ...prev.dark,
                brandColor: {
                  ...prev.dark.brandColor,
                  ...newConfig,
                },
              },
            }
          : {
              ...prev,
              [theme]: {
                ...prev[theme],
                brandColor: {
                  ...prev[theme].brandColor,
                  ...newConfig,
                },
              },
            },
      );
    },
    [],
  );

  const setBaseColor = useCallback(
    (newConfig: Partial<ConfigColors["baseColor"]>, theme: ThemeType) => {
      setConfig((prev) => ({
        ...prev,
        [theme]: {
          ...prev[theme],
          baseColor: {
            ...prev[theme].baseColor,
            ...newConfig,
          },
        },
      }));
    },
    [],
  );

  const setOtherColor = useCallback(
    (newConfig: Partial<ConfigColors["otherColor"]>, theme: ThemeType, sync: boolean) => {
      setConfig((prev) =>
        sync
          ? {
              ...prev,
              light: {
                ...prev.light,
                otherColor: {
                  ...prev.light.otherColor,
                  ...newConfig,
                },
              },
              dark: {
                ...prev.dark,
                otherColor: {
                  ...prev.dark.otherColor,
                  ...newConfig,
                },
              },
            }
          : {
              ...prev,
              [theme]: {
                ...prev[theme],
                otherColor: {
                  ...prev[theme].otherColor,
                  ...newConfig,
                },
              },
            },
      );
    },
    [],
  );

  const setBorderWidth = useCallback(
    (newBorderWidths: Partial<ConfigLayout["borderWidth"]>) =>
      setConfig((prev) => ({
        ...prev,
        layout: {
          ...prev.layout,
          borderWidth: {
            ...prev.layout.borderWidth,
            ...newBorderWidths,
          },
        },
      })),
    [],
  );

  const setLineHeight = useCallback(
    (newLineHeights: Partial<ConfigLayout["lineHeight"]>) =>
      setConfig((prev) => ({
        ...prev,
        layout: {
          ...prev.layout,
          lineHeight: {
            ...prev.layout.lineHeight,
            ...newLineHeights,
          },
        },
      })),
    [],
  );

  const setFontSize = useCallback(
    (newFontSizes: Partial<ConfigLayout["fontSize"]>) =>
      setConfig((prev) => ({
        ...prev,
        layout: {
          ...prev.layout,
          fontSize: {
            ...prev.layout.fontSize,
            ...newFontSizes,
          },
        },
      })),
    [],
  );

  const setRadius = useCallback(
    (newRadius: Partial<ConfigLayout["radius"]>) =>
      setConfig((prev) => ({
        ...prev,
        layout: {
          ...prev.layout,
          radius: {
            ...prev.layout.radius,
            ...newRadius,
          },
        },
      })),
    [],
  );

  const setOtherParams = useCallback(
    (newOtherParams: Partial<ConfigLayout["otherParams"]>) =>
      setConfig((prev) => ({
        ...prev,
        layout: {
          ...prev.layout,
          otherParams: {
            ...prev.layout.otherParams,
            ...newOtherParams,
          },
        },
      })),
    [],
  );

  const contextValue = useMemo(
    () => ({
      resetConfig,
      config,
      setBaseColor,
      setBorderWidth,
      setBrandColor,
      setConfiguration,
      setLineHeight,
      setFontSize,
      setOtherColor,
      setOtherParams,
      setRadius,
    }),
    [
      resetConfig,
      config,
      setBaseColor,
      setBorderWidth,
      setBrandColor,
      setConfiguration,
      setLineHeight,
      setFontSize,
      setOtherColor,
      setOtherParams,
      setRadius,
    ],
  );

  return (
    <ThemeBuilderContext.Provider value={contextValue}>{children}</ThemeBuilderContext.Provider>
  );
}
